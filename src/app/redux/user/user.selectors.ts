import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

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

export const selectProtectedUsers = createSelector(selectAllUsers, (users) =>
  users.filter((user) => user.protected === 'yes')
);

export const selectUsersByRole = (roleName: string) =>
  createSelector(selectAllUsers, (users) =>
    users.filter((user) => user.roleName === roleName)
  );

export const selectTotalUsers = createSelector(
  selectAllUsers,
  (users) => users.length
);

export const selectAllAdmins = createSelector(selectAllUsers, (users) =>
  users.filter((u) => u.roleName === 'admin' || u.roleName === 'superadmin')
);
