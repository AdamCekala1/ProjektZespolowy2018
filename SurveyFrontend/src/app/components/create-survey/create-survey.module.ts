import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSurveyComponent } from './create-survey.component';
import { CreateSurveyButtonComponent } from './create-survey-button/create-survey-button.component';
import { MatButtonModule, MatExpansionModule, MatInputModule } from '@angular/material';
import { CreateSurveyService } from './create-survey.service';
import { SharedModule } from '../../shared/shared.module';
import { CreateSurveyAddQuestionComponent } from './create-survey-add-question/create-survey-add-question.component';
import { CreateSurveyAddQuestionAnswerComponent } from './create-survey-add-question/create-survey-add-question-answer/create-survey-add-question-answer.component';

@NgModule({
  declarations: [CreateSurveyComponent, CreateSurveyButtonComponent, CreateSurveyAddQuestionComponent, CreateSurveyAddQuestionAnswerComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    SharedModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [CreateSurveyService],
  exports: [
    CreateSurveyComponent, CreateSurveyButtonComponent
  ]
})
export class CreateSurveyModule { }
