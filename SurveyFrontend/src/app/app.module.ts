import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertConfig, AlertModule } from 'ngx-alerts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { LoginModule } from '../../projects/ac-login/src/lib/login.module';

import { AppComponent } from './app.component';
import { MainPageModule } from './components/main-page/main-page.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { alertConfig } from './shared/constants/alert.config';
import {
  MatButtonModule, MatCardModule,
  MatDividerModule,
  MatExpansionModule, MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule
} from '@angular/material';
import { CreateSurveyModule } from './components/create-survey/create-survey.module';
import { CommonModule } from '@angular/common';
import { ResolveSurveyComponent } from './components/resolve-survey/resolve-survey.component';
import { AcSearchResultModule } from '../../projects/ac-search-result/src/lib/ac-search-result.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ResolveSurveyComponent,
  ],
  imports: [
    AcSearchResultModule,
    MatExpansionModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    CreateSurveyModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule.forRoot(),
    MainPageModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(alertConfig as AlertConfig),
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
