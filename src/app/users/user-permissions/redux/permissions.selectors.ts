import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PermissionsState } from './permissions.state';

const selectPermState = createFeatureSelector<PermissionsState>('permissions');

export const selectAllPermissions = createSelector(
  selectPermState,
  (s) => s.permissions
);

export const selectAllUserPermissions = createSelector(
  selectPermState,
  (s) => s.userPermissions
);
