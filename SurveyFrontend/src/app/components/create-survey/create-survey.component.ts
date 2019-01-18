import { Component } from '@angular/core';
import { remove } from 'lodash';
import * as moment_ from 'moment';

import { IQuestion } from './create-survey.interface';
import { CreateSurveyService } from './create-survey.service';
import { Observable } from 'rxjs';
import { ICategories } from '../../core/categories/categories.interface';
import { CategoriesService } from '../../core/categories/categories.service';

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
  category: ICategories = {} as ICategories;

  constructor(private createSurveyService: CreateSurveyService,
              private categoriesService: CategoriesService) {
    categoriesService.fetchCategories().subscribe();
  }

  setActiveCategoryId(category: ICategories) {
    this.category = category;
  }

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
    this.createSurveyService.saveSurvey(this.title, this.questions, this.category).subscribe();
  }

  removeSurvey() {
    this.createSurveyService.setIsModalVisible(false);
  }
}
