import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthService } from '../../application/services/auth.service';
import { AuthApi } from '../../infrastructure/auth/auth.api';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private authApi = inject(AuthApi);
  private router = inject(Router);
  private store = inject(Store);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authApi.login(username, password).pipe(
          map(result => {
            if (!result) {
              return AuthActions.loginFailure({ error: 'Invalid credentials' });
            }

            const { user, accessToken, refreshToken, menu } = result;

            this.authService.saveTokens(accessToken, refreshToken);
            this.authService.saveUser(user);
            this.authService.saveMenu(menu);

            this.store.dispatch(AuthActions.setMenu({ menu }));

            return AuthActions.loginSuccess({ user, accessToken, refreshToken });
          }),
          catchError(() => of(AuthActions.loginFailure({ error: 'Login failed' })))
        )
      )
    )
  );

  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      mergeMap(() => {
        const accessToken = this.authService.getAccessToken();
        const refreshToken = this.authService.getRefreshToken();
        const user = this.authService.getUser();
        const menu = this.authService.getMenu();

        if (accessToken && refreshToken && user) {
          this.store.dispatch(AuthActions.setMenu({ menu }));
          return of(AuthActions.loginSuccess({ user, accessToken, refreshToken }));
        }

        return of(AuthActions.logout());
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() =>
        this.authApi.refreshToken().pipe(
          map(newAccessToken => {
            this.authService.saveTokens(newAccessToken, this.authService.getRefreshToken()!);
            return AuthActions.refreshSuccess({ accessToken: newAccessToken });
          }),
          catchError(() => of(AuthActions.refreshFailure()))
        )
      )
    )
  );

  refreshFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshFailure),
      map(() => AuthActions.logout())
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.clearAll();
        this.router.navigate(['/login']);
      })
    ), { dispatch: false }
  );

  // ✅ NEW: navigate to /home when loginSuccess
  loginSuccessNavigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.router.navigate(['/home']);
      })
    ), { dispatch: false }
  );
}
