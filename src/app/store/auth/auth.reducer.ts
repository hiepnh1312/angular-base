import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState, initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { user, accessToken, refreshToken }) => ({
    ...state,
    isAuthenticated: true,
    user,
    accessToken,
    refreshToken,
    error: null,
  })),
  on(AuthActions.refreshSuccess, (state, { accessToken }) => ({
    ...state,
    accessToken
  })),
  on(AuthActions.setMenu, (state, { menu }) => ({
    ...state,
    menu
  })),
  on(AuthActions.logout, () => initialAuthState),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
