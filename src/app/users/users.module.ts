import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TableComponent } from './components/table/table.component';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { ColumnVisionDirective } from './directives/column-vision.directive';
import { Features } from './store/constants/features';
import { usersReducer } from './store/users.reducer';
import { UsersEffects } from './store/users.effects';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [TableComponent, UsersComponent, ColumnVisionDirective],
  imports: [
    CommonModule,
    SharedModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    UsersRoutingModule,
    StoreModule.forFeature(Features.Users, usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  exports: [UsersComponent],
})
export class UsersModule {}
