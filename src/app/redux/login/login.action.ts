import { createAction, props } from '@ngrx/store';
import { Login } from './login.state';
import { User } from '../user/user.state';

export const loadLoginState = createAction('[Login] Load Login State');

export const loadLoginSuccess = createAction(
  '[Users] Load Success',
  props<{ login: Login[] }>()
);

export const loadLoginFailure = createAction(
  '[Users] Load Failure',
  props<{ error: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ user: User }>()
);

export const logout = createAction('[Login] Logout');
