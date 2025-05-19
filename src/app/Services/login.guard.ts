import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let loggedUser;
  if (typeof window !== 'undefined' && localStorage) {
    loggedUser = localStorage.getItem('loggedUser');
  }
  if (loggedUser) {
    router.navigate(['/products']);
    return false; 
  }
  else if(route.routeConfig?.path === 'auth_redirect'){
    router.navigate(['/auth_redirect']);
    return false;
  }
  return true; 
};
