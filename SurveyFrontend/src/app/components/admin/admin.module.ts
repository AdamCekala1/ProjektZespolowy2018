import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { routes } from './admin.routing';
import { SharedModule } from '../../shared/shared.module';
import { AdminSurveysComponent } from './admin-surveys/admin-surveys.component';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule, MatInputModule,
  MatListModule
} from '@angular/material';
import { AcSearchResultModule } from '../../../../projects/ac-search-result/src/lib/ac-search-result.module';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminSurveysResolver } from './admin-surveys.resolver';
import { AdminCategoriesResolver } from './admin-categories.resolver';

@NgModule({
  declarations: [
    AdminComponent,
    AdminSurveysComponent,
    AdminPanelComponent,
  ],
  providers: [AdminSurveysResolver, AdminCategoriesResolver],
  imports: [
    CommonModule,
    SharedModule,
    AcSearchResultModule,
    MatExpansionModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
