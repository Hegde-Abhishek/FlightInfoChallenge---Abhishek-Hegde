import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

export const canActivateAuth: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const user = await new Promise<any>(resolve => onAuthStateChanged(auth, resolve));
  if (user) return true;
  router.navigate(['/login']);
  return false;
};
