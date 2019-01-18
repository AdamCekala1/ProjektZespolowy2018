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
  MatListModule, MatTooltipModule
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
import { EditUserComponent } from './edit-user/edit-user.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    UserComponent,
    UserPersonalDetailComponent,
    EditSurveyComponent,
    UserWrapperComponent,
    EditSurveyQuestionComponent,
    EditSurveyEditModeComponent,
    EditUserComponent
  ],
  providers: [CanActivateUserGuard, SurveysUserResolver],
  imports: [
    MatExpansionModule,
    MatDividerModule,
    MatTooltipModule,
    MatInputModule,
    CommonModule,
    SharedModule,
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
