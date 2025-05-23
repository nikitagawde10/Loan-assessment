import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User, UserState } from './user.state';

export const selectUsersState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  (state) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectUserById = (userId: string) =>
  createSelector(selectUsersState, (state) =>
    state.users.find((user) => user.id === userId)
  );

export const selectUsersError = createSelector(
  selectUsersState,
  (state) => state.error
);

export const selectUser = (email: string, password: string) =>
  createSelector(selectAllUsers, (users) =>
    users.find((user) => user.email === email && user.password === password)
  );
