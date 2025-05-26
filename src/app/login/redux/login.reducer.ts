import { createReducer, on } from '@ngrx/store';
import { initialLoginState } from './login.state';
import {
  loadLoginState,
  loadLoginSuccess,
  loadLoginFailure,
  loginSuccess,
  logout,
} from './login.action';

export const loginReducer = createReducer(
  initialLoginState,

  on(loadLoginState, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadLoginSuccess, (state, { login }) => ({
    ...state,
    loginCredentials: login[0],
    loading: false,
    error: null,
  })),

  on(loadLoginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loginSuccess, (state, { user }) => ({
    ...state,
    loggedInUser: user,
    isLoggedIn: true,
  })),

  on(logout, (state) => ({
    ...state,
    loggedInUser: null,
    isLoggedIn: false,
  }))
);
