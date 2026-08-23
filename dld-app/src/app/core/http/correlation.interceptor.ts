import { HttpInterceptorFn } from '@angular/common/http';

const CORRELATION_HEADER = 'X-Correlation-Id';

export const correlationInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  const correlationId = req.headers.get(CORRELATION_HEADER) ?? crypto.randomUUID();

  return next(req.clone({
    setHeaders: {
      [CORRELATION_HEADER]: correlationId,
    },
  }));
};
