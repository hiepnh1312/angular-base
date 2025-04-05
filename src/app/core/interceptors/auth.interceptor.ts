import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../application/services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { catchError, throwError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const store = inject(Store);

  const token = auth.getAccessToken();
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        store.dispatch(AuthActions.refreshToken());
        // không retry tại đây, để effects xử lý
      }
      return throwError(() => error);
    })
  );
};
