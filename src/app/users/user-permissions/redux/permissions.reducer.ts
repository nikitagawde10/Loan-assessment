import { createReducer, on } from '@ngrx/store';
import { initialPermissionsState } from './permissions.state';
import { addCustomPermission } from './permissions.action';

export const permissionsReducer = createReducer(
  initialPermissionsState,
  on(addCustomPermission, (state, { userId, permissionIds }) => ({
    ...state,
    userPermissions: state.userPermissions.map((up) =>
      up.userId === userId
        ? {
            ...up,
            permissions: state.permissions.filter((p) =>
              permissionIds.includes(p.id)
            ),
          }
        : up
    ),
  }))
);
