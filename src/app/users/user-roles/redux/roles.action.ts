import { createAction, props } from '@ngrx/store';
import { UserRole } from './roles.state';

export const loadUserRoles = createAction('[UserRoles] Load UserRoles');

export const loadUserRolesSuccess = createAction(
  '[UserRoles] Load Success',
  props<{ roles: UserRole[] }>()
);

export const loadUserRolesFailure = createAction(
  '[UserRoles] Load Failure',
  props<{ error: string }>()
);

export const addUserRole = createAction(
  '[UserRoles] Add UserRole',
  props<{ role: UserRole }>()
);
export const deleteRole = createAction(
  '[UserRoles] Delete UserRole',
  props<{ roleName: string }>()
);
