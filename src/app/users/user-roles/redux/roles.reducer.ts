import { createReducer, on } from '@ngrx/store';
import {
  addUserRole,
  deleteRole,
  loadUserRoles,
  loadUserRolesFailure,
  loadUserRolesSuccess,
} from './roles.action';
import { initialUserRolesState } from './roles.state';

export const userRolesReducer = createReducer(
  initialUserRolesState,

  on(loadUserRoles, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadUserRolesSuccess, (state, { roles }) => ({
    ...state,
    roles,
    loading: false,
    error: null,
  })),

  on(loadUserRolesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(addUserRole, (state, { role }) => ({
    ...state,
    roles: [...state.roles, role],
  })),

  on(deleteRole, (state, { roleName }) => ({
    ...state,
    roles: state.roles.filter((role) => role.roleName !== roleName),
  }))
);
