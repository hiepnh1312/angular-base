import { createAction, props } from '@ngrx/store';
import { User } from '../../domain/models/user.model';
import {MenuItem} from './auth.state';

export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User; accessToken: string; refreshToken: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');

export const initAuth = createAction('[Auth] Init Auth');
export const refreshToken = createAction('[Auth] Refresh Token');
export const refreshSuccess = createAction('[Auth] Refresh Token Success', props<{ accessToken: string }>());
export const refreshFailure = createAction('[Auth] Refresh Token Failure');
export const setMenu = createAction('[Auth] Set Menu', props<{ menu: MenuItem[] }>());
