import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface ApiError {
  status: number;
  code: string;
  message: string;
  correlationId?: string;
  validationErrors?: Record<string, string[]>;
}

const messages: Record<number, string> = {
  400: 'The request could not be processed.',
  401: 'Authentication is required or has expired.',
  403: 'You do not have permission to perform this action.',
  404: 'The requested resource was not found.',
  409: 'The operation conflicts with the current state.',
  422: 'Please review the submitted information.',
  429: 'Too many requests. Please try again later.',
  500: 'Something went wrong on the server.',
  502: 'The service is temporarily unavailable.',
  503: 'The service is temporarily unavailable.',
  504: 'The service took too long to respond.',
};

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: unknown) => {
      if (!(error instanceof HttpErrorResponse) || !req.url.startsWith('/api/')) {
        return throwError(() => error);
      }

      const body = isRecord(error.error) ? error.error : {};
      const normalized: ApiError = {
        status: error.status,
        code: typeof body['code'] === 'string' ? body['code'] : `HTTP_${error.status}`,
        message: messages[error.status] ?? 'The request could not be completed.',
        correlationId:
          error.headers.get('X-Correlation-Id') ??
          (typeof body['correlationId'] === 'string' ? body['correlationId'] : undefined),
        validationErrors: isRecord(body['errors'])
          ? body['errors'] as Record<string, string[]>
          : undefined,
      };

      return throwError(() => normalized);
    }),
  );

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
