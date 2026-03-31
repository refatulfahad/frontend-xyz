import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const raw = localStorage.getItem('loggedUser');
  const userInfo = raw ? JSON.parse(raw) : null;

  if (userInfo?.access_token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userInfo.access_token}`
      }
    });
  }

  return next(req);
};
