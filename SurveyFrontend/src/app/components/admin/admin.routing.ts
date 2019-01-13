import { Routes } from '@angular/router';

import { CanActivateUserGuard } from '../../core/guards/can-activate-user.guard';
import { AdminComponent } from './admin.component';
import { CanActivateAdminGuard } from '../../core/guards/can-activate-admin.guard';
import { AdminSurveysComponent } from './admin-surveys/admin-surveys.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminSurveysResolver } from './admin-surveys.resolver';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [CanActivateUserGuard, CanActivateAdminGuard],
    resolve: [AdminSurveysResolver],
    children: [
      {
        path: '',
        component: AdminPanelComponent,
      }, {
        path: 'survey/:id',
        component: AdminSurveysComponent,
      }
    ],
  },
  { path: '**', redirectTo: '' }
];
