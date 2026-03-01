import { createReducer, on } from '@ngrx/store';
import { User } from '../models/auth.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  requiresTwoFactor: boolean;
  tempToken: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  requiresTwoFactor: false,
  tempToken: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    requiresTwoFactor: response.requiresTwoFactor,
    tempToken: response.tempToken || null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(AuthActions.logout, () => initialState)
);
