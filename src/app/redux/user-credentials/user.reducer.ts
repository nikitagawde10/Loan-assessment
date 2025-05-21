import { createReducer, on } from '@ngrx/store';
import { initialUserState } from './user.state';
import {
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  addUser,
  updateUser,
  deleteUser,
} from './user.action';

export const userCredentialsReducer = createReducer(
  initialUserState,
  on(loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(addUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
  })),

  on(updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? { ...u, ...user } : u)),
  })),

  on(deleteUser, (state, { deleteUserId }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== deleteUserId),
  }))
);
