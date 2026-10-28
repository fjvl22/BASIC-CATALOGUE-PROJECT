import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticatedState = signal(false);

  readonly isAuthenticated = this.authenticatedState.asReadonly();

  readonly isAdmin = computed(() => this.authenticatedState());

  login(username: string, password: string): boolean {
    const validCredentials =
      username.trim() === 'admin' && password === 'admin123';

    this.authenticatedState.set(validCredentials);

    return validCredentials;
  }

  logout(): void {
    this.authenticatedState.set(false);
  }
}