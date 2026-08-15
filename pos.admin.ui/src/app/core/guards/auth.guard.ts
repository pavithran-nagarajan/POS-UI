import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  // Redirect to login, preserving the attempted URL for post-login redirect
  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};