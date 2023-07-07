import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subscription, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { ColumnsName } from '../../models/collumnsName.type';
import { SortUsersService } from '../../services/sort-users.service';
import { UsersFacadeService } from '../../services/users-facade.service';
import { UserData } from '../../models/user-data.model';
import { checkboxNames } from '../../constans/checkbox-name';
import { columnsName } from '../../constans/collumns-name';
import { isCheckedColumnsName } from '../../constans/is-checked-collumns-name';

@Component({
  selector: 'agn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  public users!: MatTableDataSource<UserData>;
  public isCheckboxVisible = false;
  public columnsName = columnsName;
  public checkboxNames = checkboxNames;
  public isCheckedColumnsName = isCheckedColumnsName;
  public filterControl: FormControl = new FormControl('');
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;
  private subscriptions = new Subscription();

  constructor(
    private usersFacadeService: UsersFacadeService,
    private usersSortService: SortUsersService
  ) {}

  public ngOnInit(): void {
    this.subscriptions.add(
      this.usersSortService.sortedUsers$
        .pipe(
          tap(() => {
            this.usersFacadeService.getLoading();
          })
        )
        .subscribe((data) => {
          this.users = new MatTableDataSource(data);
          this.users.paginator = this.paginator;
          this.users.sort = this.sort;
        })
    );
    this.subscriptions.add(
      this.filterControl.valueChanges
        .pipe(debounceTime(300))
        .subscribe((value) => {
          this.users.filter = value;
          if (this.users.paginator) {
            this.users.paginator.firstPage();
          }
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public sortedUsers(sortCriteria: Sort): void {
    this.usersSortService.sortUsers(sortCriteria);
  }

  public onCheckboxVisibility(): void {
    this.isCheckboxVisible = !this.isCheckboxVisible;
  }

  public checkedColumnsName(columnName: ColumnsName): void {
    this.isCheckedColumnsName[columnName] =
      !this.isCheckedColumnsName[columnName];
  }
}
