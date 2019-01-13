import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IQuestion } from '../create-survey.interface';
import { remove } from 'lodash';

@Component({
  selector: 'ac-create-survey-add-question',
  templateUrl: './create-survey-add-question.component.html',
  styleUrls: ['./create-survey-add-question.component.scss']
})
export class CreateSurveyAddQuestionComponent implements OnInit {
  isAddAnwerMode: boolean = false;
  questions: IQuestion = {content: '', answers: []};
  @Output() onAddQuestion: EventEmitter<IQuestion> = new EventEmitter();
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleAnswerMode() {
    console.log(this.isAddAnwerMode)
    this.isAddAnwerMode = !this.isAddAnwerMode;
  }

  handleQustionAnswer(content: string) {
    console.log('handleQustionAnswer')
    if(content) {
      console.log('content', content)
      this.questions.answers.push({content});
    }

    this.toggleAnswerMode();
  }

  saveQuestion() {
    this.onAddQuestion.emit(this.questions);
  }

  cancelQuestion() {
    this.questions = {content: '', answers: []};

    this.onCancel.emit(true);
  }

  removeAnswer(content: string) {
    remove(this.questions.answers, {content});
  }
}
