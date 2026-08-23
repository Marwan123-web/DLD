import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Authentication is intentionally centralized here.
 *
 * The preferred production model is a same-origin HttpOnly/Secure/SameSite
 * session cookie. The browser therefore does not need to read or persist
 * long-lived credentials in application JavaScript.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  return next(req.clone({ withCredentials: true }));
};
