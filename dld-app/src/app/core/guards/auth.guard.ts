import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// TODO(backend): Implement real auth check. Currently always allows navigation (stub).
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }
  // Redirect unauthenticated users to sign-in page.
  return router.createUrlTree(['/auth/signin']);
};
