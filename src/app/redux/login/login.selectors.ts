import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.state';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectIsLoggedIn = createSelector(
  selectLoginState,
  (state) => state.isLoggedIn
);

export const selectLoginLoading = createSelector(
  selectLoginState,
  (state) => state.loading
);

export const selectLoggedInUser = createSelector(
  selectLoginState,
  (state) => state.loggedInUser
);

// Selector to get the role of the logged-in user
export const selectUserRole = createSelector(
  selectLoggedInUser,
  (user) => user ? user.roleName : null
);
 