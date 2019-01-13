import { Component } from '@angular/core';
import { remove } from 'lodash';
import * as moment_ from 'moment';

import { IQuestion } from './create-survey.interface';
import { CreateSurveyService } from './create-survey.service';
import { Observable } from 'rxjs';

const moment = moment_;

@Component({
  selector: 'ac-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.scss']
})
export class CreateSurveyComponent {
  questions: IQuestion[] = [];
  title: string = '';
  addQuestionMode: boolean = false;

  constructor(private createSurveyService: CreateSurveyService) { }

  isModalVisible(): Observable<boolean> {
    return this.createSurveyService.getIsVisible();
  }

  toggleQuestionMode() {
    this.addQuestionMode = !this.addQuestionMode;
  }

  addQuestion(question: IQuestion) {
    this.questions.push(question);

    this.toggleQuestionMode();
  }

  removeQuestion(question: IQuestion) {
    remove(this.questions, question);
  }

  saveSurvey() {
    this.createSurveyService.saveSurvey(this.title, this.questions).subscribe()
  }

  removeSurvey() {
    this.createSurveyService.setIsModalVisible(false);
  }
}
