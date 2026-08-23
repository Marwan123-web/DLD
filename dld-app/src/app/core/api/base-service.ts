import { HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTransport } from './api-transport';
import { MockApiTransport } from './mock-api-transport';
import { API_TRANSPORT } from './api-transport.token';

export abstract class BaseService<
  Entity,
  CreateRequest = Partial<Entity>,
  UpdateRequest = Partial<Entity>,
  Id = string,
  MockEntity = Entity,
> {
  private readonly transport = inject<ApiTransport>(API_TRANSPORT);
  private readonly mockTransport = inject(MockApiTransport);

  protected readonly api = this.transport;
  protected readonly resourceUrl: string;

  protected constructor(resourceUrl: string, mockEntities: readonly MockEntity[] = []) {
    this.resourceUrl = resourceUrl;
    this.mockTransport.register(resourceUrl, mockEntities, {
      delayMs: 250,
      failureRate: 0,
    });
  }

  protected registerMockResource<T>(
    resourceUrl: string,
    mockEntities: readonly T[],
    options?: import('./mock-api-transport').MockOptions,
  ): void {
    this.mockTransport.register(resourceUrl, mockEntities, options);
  }

  protected getAll(params?: HttpParams): Observable<Entity[]> {
    return this.api.get<Entity[]>(this.resourceUrl, params);
  }

  protected getById(id: Id): Observable<Entity> {
    return this.api.get<Entity>(this.getResourceUrl(id));
  }

  protected create(request: CreateRequest): Observable<Entity> {
    return this.api.post<CreateRequest, Entity>(this.resourceUrl, request);
  }

  protected update(id: Id, request: UpdateRequest): Observable<Entity> {
    return this.api.put<UpdateRequest, Entity>(this.getResourceUrl(id), request);
  }

  protected patch(id: Id, request: UpdateRequest): Observable<Entity> {
    return this.api.patch<UpdateRequest, Entity>(this.getResourceUrl(id), request);
  }

  protected delete(id: Id): Observable<void> {
    return this.api.delete<void>(this.getResourceUrl(id));
  }

  private getResourceUrl(id: Id): string {
    return `${this.resourceUrl}/${encodeURIComponent(String(id))}`;
  }
}
