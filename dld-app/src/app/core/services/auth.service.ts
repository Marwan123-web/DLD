import { Injectable, signal } from '@angular/core';

// TODO(backend): Replace stub with real authentication against DLD identity provider.
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isAuthenticated = signal<boolean>(false);

  login(_credentials: { username: string; password: string }): void {
    // TODO(backend): POST to auth endpoint; set token; update isAuthenticated.
    this.isAuthenticated.set(true);
  }

  logout(): void {
    // TODO(backend): Invalidate token on server; clear local storage.
    this.isAuthenticated.set(false);
  }
}
