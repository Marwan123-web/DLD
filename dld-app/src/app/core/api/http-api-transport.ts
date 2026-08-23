import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiTransport } from './api-transport';

@Injectable({ providedIn: 'root' })
export class HttpApiTransport implements ApiTransport {
  private readonly http = inject(HttpClient);

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  post<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(url, request);
  }

  put<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse> {
    return this.http.put<TResponse>(url, request);
  }

  patch<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse> {
    return this.http.patch<TResponse>(url, request);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
