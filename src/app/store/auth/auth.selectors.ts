import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  state => state.user
);

export const selectMenu = createSelector(
  selectAuthState,
  state => state.menu
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  state => !!state.accessToken
);

export const selectAuthError = createSelector(
  selectAuthState,
  state => state.error
);
