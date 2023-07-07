import { createReducer, on } from '@ngrx/store';
import { getLoading, getUsersFailure, getUsersSuccess } from './users.action';
import { initialUsersState } from './users.state';
import { UsersState } from './models/users-state.model';

export const usersReducer = createReducer(
  initialUsersState,
  on(
    getLoading,
    (usersState): UsersState => ({
      ...usersState,
      isLoading: true,
    })
  ),
  on(
    getUsersSuccess,
    (usersState, { users }): UsersState => ({
      ...usersState,
      users,
      isLoading: false,
    })
  ),
  on(
    getUsersFailure,
    (usersState, { error }): UsersState => ({
      ...usersState,
      error,
      isLoading: false,
    })
  )
);
