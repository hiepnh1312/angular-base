import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

export const provideStoreFeatures = [
  provideState('auth', authReducer),
  provideEffects([AuthEffects]),
];
