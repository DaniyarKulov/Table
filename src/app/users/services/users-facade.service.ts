import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoading } from '../store/users.action';
import { selectLoading, selectUsers } from '../store/users.selectors';

@Injectable({
  providedIn: 'root',
})
export class UsersFacadeService {
  public users$ = this.store$.select(selectUsers);
  public isLoading$ = this.store$.select(selectLoading);

  constructor(private store$: Store) {}

  public getLoading(): void {
    this.store$.dispatch(getLoading());
  }
}
