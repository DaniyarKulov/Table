import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UsersHttpService } from '../services/users-http.service';
import {
  getUsersFailure,
  getUsersSuccess,
  startUsersLoading,
} from './users.action';

@Injectable()
export class UsersEffects {
  public getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startUsersLoading),
      switchMap(() =>
        this.usersHttpService.getUsers().pipe(
          map((users) => getUsersSuccess({ users })),
          catchError(({ message }) => of(getUsersFailure(message)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersHttpService: UsersHttpService
  ) {}
}
