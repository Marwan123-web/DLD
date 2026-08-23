import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiTransport {
  get<T>(url: string, params?: HttpParams): Observable<T>;
  post<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse>;
  put<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse>;
  patch<TRequest, TResponse>(url: string, request: TRequest): Observable<TResponse>;
  delete<T>(url: string): Observable<T>;
}
