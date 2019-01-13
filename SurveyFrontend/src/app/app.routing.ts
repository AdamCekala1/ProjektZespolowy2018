import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ResolveSurveyComponent } from './components/resolve-survey/resolve-survey.component';

export const appRoutes: Routes = [
  { path: 'profile',
    loadChildren: './components/user/user.module#UserModule',
  },
  { path: 'admin',
    loadChildren: './components/admin/admin.module#AdminModule',
  },
  { path: '',
    component: MainPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'survey/:id',
    component: ResolveSurveyComponent,
  },
  { path: '**', redirectTo: '' }
];
