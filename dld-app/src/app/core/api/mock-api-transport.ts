import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, defer, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiTransport } from './api-transport';

export interface MockOptions {
  delayMs?: number;
  failureRate?: number;
}

interface MockCollection {
  entities: unknown[];
  options: Required<MockOptions>;
}

@Injectable({ providedIn: 'root' })
export class MockApiTransport implements ApiTransport {
  private readonly collections = new Map<string, MockCollection>();

  register<T>(resourceUrl: string, entities: readonly T[], options: MockOptions = {}): void {
    this.collections.set(resourceUrl, {
      entities: entities.map(entity => this.clone(entity)),
      options: {
        delayMs: Math.max(0, options.delayMs ?? 0),
        failureRate: Math.min(1, Math.max(0, options.failureRate ?? 0)),
      },
    });
  }

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.execute(url, 'GET', () => {
      const baseUrl = this.getRegisteredBaseUrl(url);
      const collection = this.getCollection(baseUrl);
      const entityId = this.getEntityIdFromUrl(url, collection);
      if (entityId !== null) {
        const entity = collection.entities.find(item => this.entityId(item) === entityId);
        if (entity === undefined) throw new HttpErrorResponse({ status: 404, error: { message: `Resource '${entityId}' was not found.` } });
        return this.clone(entity) as T;
      }

      const filtered = this.applyQuery(collection.entities, params);
      return filtered as T;
    });
  }

  post<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse> {
    return this.execute(url, 'POST', () => {
      const collection = this.getCollection(url);
      const entity = this.clone(request as unknown);
      collection.entities.push(entity);
      return this.clone(entity) as TResponse;
    });
  }

  put<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse> {
    return this.update(url, request);
  }

  patch<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse> {
    return this.update(url, request);
  }

  delete<T>(url: string): Observable<T> {
    return this.execute(url, 'DELETE', () => {
      const baseUrl = this.getRegisteredBaseUrl(url);
      const collection = this.getCollection(baseUrl);
      const entityId = this.getEntityIdFromUrl(url, collection);
      if (entityId === null) throw new HttpErrorResponse({ status: 400, error: { message: 'An entity id is required.' } });
      const index = collection.entities.findIndex(item => this.entityId(item) === entityId);
      if (index < 0) throw new HttpErrorResponse({ status: 404, error: { message: `Resource '${entityId}' was not found.` } });
      collection.entities.splice(index, 1);
      return undefined as T;
    });
  }

  private update<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse> {
    return this.execute(url, 'WRITE', () => {
      const baseUrl = this.getRegisteredBaseUrl(url);
      const collection = this.getCollection(baseUrl);
      const entityId = this.getEntityIdFromUrl(url, collection);
      if (entityId === null) throw new HttpErrorResponse({ status: 400, error: { message: 'An entity id is required.' } });
      const index = collection.entities.findIndex(item => this.entityId(item) === entityId);
      if (index < 0) throw new HttpErrorResponse({ status: 404, error: { message: `Resource '${entityId}' was not found.` } });
      collection.entities[index] = {
        ...(collection.entities[index] as object),
        ...(request as object),
      };
      return this.clone(collection.entities[index]) as TResponse;
    });
  }

  private execute<T>(
    url: string,
    _method: string,
    factory: () => T,
  ): Observable<T> {
    const collection = this.collections.get(this.getRegisteredBaseUrl(url));
    const options = collection?.options ?? { delayMs: 0, failureRate: 0 };

    return defer(() => {
      if (options.failureRate > 0 && Math.random() < options.failureRate) {
        throw new HttpErrorResponse({
          status: 503,
          error: { message: 'Simulated mock service failure.' },
        });
      }

      return of(factory());
    }).pipe(delay(options.delayMs));
  }

  private getCollection(resourceUrl: string): MockCollection {
    const collection = this.collections.get(resourceUrl);
    if (!collection) throw new Error(`No mock collection registered for '${resourceUrl}'.`);
    return collection;
  }

  private getResourceUrl(url: string): string {
    const [path] = url.split('?');
    return path.replace(/\/$/, '');
  }

  private getRegisteredBaseUrl(url: string): string {
    const resourceUrl = this.getResourceUrl(url);
    const base = [...this.collections.keys()]
      .filter(key => resourceUrl === key || resourceUrl.startsWith(`${key}/`))
      .sort((a, b) => b.length - a.length)[0];
    if (!base) throw new Error(`No mock collection registered for '${resourceUrl}'.`);
    return base;
  }

  private getEntityIdFromUrl(url: string, _collection: MockCollection): string | null {
    const resourceUrl = this.getResourceUrl(url);
    const base = this.getRegisteredBaseUrl(url);
    if (resourceUrl === base) return null;
    const id = decodeURIComponent(resourceUrl.slice(base.length + 1));
    return id || null;
  }

  private entityId(entity: unknown): string {
    const id = (entity as { id?: string | number })?.id;
    if (id === undefined || id === null) throw new Error('Mock CRUD entities must have an id.');
    return String(id);
  }

  private applyQuery(entities: readonly unknown[], params?: HttpParams): unknown[] {
    let result = entities.map(entity => this.clone(entity));

    const search = params?.get('search')?.trim().toLowerCase();
    const category = params?.get('category')?.trim();
    if (search) {
      result = result.filter(entity => JSON.stringify(entity).toLowerCase().includes(search));
    }
    if (category && category !== 'all') {
      result = result.filter(entity => {
        const value = (entity as { category?: unknown })?.category;
        return String(value ?? '') === category;
      });
    }

    const sortBy = params?.get('sortBy');
    const sortDirection = params?.get('sortDirection') === 'desc' ? -1 : 1;
    if (sortBy) {
      result.sort((a, b) =>
        String((a as Record<string, unknown>)?.[sortBy] ?? '')
          .localeCompare(String((b as Record<string, unknown>)?.[sortBy] ?? '')) * sortDirection
      );
    }

    const page = Number(params?.get('page') ?? 1);
    const pageSize = Number(params?.get('pageSize') ?? result.length);
    if (Number.isFinite(page) && Number.isFinite(pageSize) && pageSize > 0) {
      const start = Math.max(0, (page - 1) * pageSize);
      result = result.slice(start, start + pageSize);
    }

    return result;
  }

  private clone<T>(value: T): T {
    if (value === undefined || value === null) return value;
    return structuredClone(value);
  }
}
