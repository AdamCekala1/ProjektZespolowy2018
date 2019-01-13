import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule, MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule
} from '@angular/material';

import { UserComponent } from './user.component';
import { routes } from './user.routing';
import { UserPersonalDetailComponent } from './user-personal-detail/user-personal-detail.component';
import { AcSearchResultModule } from '../../../../projects/ac-search-result/src/lib/ac-search-result.module';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { UserWrapperComponent } from './user-wrapper/user-wrapper.component';
import { CanActivateUserGuard } from '../../core/guards/can-activate-user.guard';
import { EditSurveyQuestionComponent } from './edit-survey/edit-survey-question/edit-survey-question.component';
import { EditSurveyEditModeComponent } from './edit-survey/edit-survey-edit-mode/edit-survey-edit-mode.component';
import { SurveysUserResolver } from './survey-user.resolver';

@NgModule({
  declarations: [
    UserComponent,
    UserPersonalDetailComponent,
    EditSurveyComponent,
    UserWrapperComponent,
    EditSurveyQuestionComponent,
    EditSurveyEditModeComponent
  ],
  providers: [CanActivateUserGuard, SurveysUserResolver],
  imports: [
    MatExpansionModule,
    MatDividerModule,
    MatInputModule,
    CommonModule,
    AcSearchResultModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
  bootstrap: [UserWrapperComponent]
})
export class UserModule { }
