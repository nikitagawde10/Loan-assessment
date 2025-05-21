import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserRolesState } from './roles.state';

export const selectUserRolesState =
  createFeatureSelector<UserRolesState>('userRoles');

export const selectAllUserRoles = createSelector(
  selectUserRolesState,
  (state) => state.roles
);

export const selectUserRoleLoading = createSelector(
  selectUserRolesState,
  (state) => state.loading
);
