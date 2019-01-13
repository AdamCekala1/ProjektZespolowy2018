import { Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { UserWrapperComponent } from './user-wrapper/user-wrapper.component';
import { CanActivateUserGuard } from '../../core/guards/can-activate-user.guard';
import { SurveysUserResolver } from './survey-user.resolver';

export const routes: Routes = [
  {
    path: '',
    component: UserWrapperComponent,
    canActivate: [CanActivateUserGuard],
    resolve: [SurveysUserResolver],
    children: [
      {
        path: '',
        component: UserComponent,
      }, {
        path: 'survey/:id',
        component: EditSurveyComponent,
      }
    ],
  },
  { path: '**', redirectTo: '' }
];
