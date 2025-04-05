import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../application/services/auth.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import {catchError} from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const store = inject(Store);

  const token = authService.getAccessToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: any) => {
      if (error.status === 401) {
        store.dispatch(AuthActions.refreshFailure());
      }
      throw error;
    })
  );
};
