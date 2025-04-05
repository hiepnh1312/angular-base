import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(selectAuthState, state => state.isAuthenticated);
export const selectAccessToken = createSelector(selectAuthState, state => state.accessToken);
export const selectRefreshToken = createSelector(selectAuthState, state => state.refreshToken);
export const selectAuthUser = createSelector(selectAuthState, state => state.user);
export const selectAuthError = createSelector(selectAuthState, state => state.error);
export const selectAuthMenu = createSelector(
  selectAuthState,
  state => state.menu
);
