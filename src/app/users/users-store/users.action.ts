import { createAction, props } from '@ngrx/store';
import { UserActions } from './constants/users-actions';
import { UserData } from '../models/user-data.model';

export const getLoading = createAction(UserActions.GetUsers);

export const getUsersSuccess = createAction(
  UserActions.GetUsersSuccess,
  props<{
    users: UserData[];
  }>()
);

export const getUsersFailure = createAction(
  UserActions.GetUsersFailure,
  props<{
    error: string | null;
  }>()
);
