import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../application/services/auth.service';
import { AuthApi } from '../../infrastructure/auth/auth.api';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';

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
          map(user => {
            if (!user) return AuthActions.loginFailure({ error: 'Invalid credentials' });

            const accessToken = user.token;
            const refreshToken = 'fake-refresh-token';
            this.authService.saveTokens(accessToken, refreshToken);

            // ✅ Dispatch menu tách riêng (tùy role nếu muốn)
            const menu = [
              { label: 'sidebar.home', path: '/home', roles: ['admin', 'user'] },
              { label: 'sidebar.login', path: '/login', roles: ['guest'] }
            ];

            this.store.dispatch(AuthActions.setMenu({ menu }));

            return AuthActions.loginSuccess({ user, accessToken, refreshToken });
          }),
          catchError(() => of(AuthActions.loginFailure({ error: 'Login failed' })))
        )
      )
    )
  );

  redirectAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/home']))
    ), { dispatch: false }
  );

  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.initAuth),
      mergeMap(() => {
        const access = this.authService.getAccessToken();
        const refresh = this.authService.getRefreshToken();
        if (access && refresh) {
          return of(AuthActions.refreshSuccess({ accessToken: access }));
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
          map(newToken => {
            this.authService.saveTokens(newToken, this.authService.getRefreshToken()!);
            return AuthActions.refreshSuccess({ accessToken: newToken });
          }),
          catchError(() => of(AuthActions.refreshFailure()))
        )
      )
    )
  );

  refreshFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshFailure),
      map(() => AuthActions.logout())
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.clearTokens();
        this.router.navigate(['/login']);
      })
    ), { dispatch: false }
  );
}
