import { Injectable, signal } from '@angular/core';

/**
 * Authentication state is intentionally kept separate from API transport.
 *
 * In production the preferred model is a server-managed HttpOnly/Secure/SameSite
 * session. The actual identity-provider contract is not present in the supplied
 * source, so this service does not invent one or fake a successful login.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isAuthenticated = signal(false);

  /**
   * Replace this method when the DLD identity-provider contract is available.
   * It deliberately does not set authenticated state on the client.
   */
  login(_credentials: { username: string; password: string }): never {
    throw new Error('Authentication endpoint is not configured yet.');
  }

  logout(): void {
    this.isAuthenticated.set(false);
  }

  /** Allows a future session/bootstrap check to update UX state after the server confirms it. */
  setAuthenticated(value: boolean): void {
    this.isAuthenticated.set(value);
  }
}
