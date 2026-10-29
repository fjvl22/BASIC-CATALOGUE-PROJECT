
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  provideRouter,
} from '@angular/router';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let router: Router;
  let authServiceMock: {
    isAuthenticated: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    });

    router = TestBed.inject(Router);
  });

  function executeGuard(url: string) {
    return TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url } as RouterStateSnapshot,
      ),
    );
  }

  it('allows access when the user is authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(true);

    const result = executeGuard('/admin');

    expect(result).toBe(true);
  });

  it('redirects to login when the user is not authenticated', () => {
    authServiceMock.isAuthenticated.mockReturnValue(false);

    const result = executeGuard('/admin');

    expect(result).not.toBe(true);
    expect(result).not.toBe(false);

    const urlTree = result as UrlTree;

    expect(router.serializeUrl(urlTree)).toContain('/login');
  });

  it('preserves the requested URL in returnUrl', () => {
    authServiceMock.isAuthenticated.mockReturnValue(false);

    const result = executeGuard('/admin/products/new');

    const urlTree = result as UrlTree;
    const queryParams = urlTree.queryParams;

    expect(queryParams['returnUrl']).toBe('/admin/products/new');
  });
});
