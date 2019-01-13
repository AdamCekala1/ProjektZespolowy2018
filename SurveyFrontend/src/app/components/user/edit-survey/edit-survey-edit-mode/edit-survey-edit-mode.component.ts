import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cloneDeep, isEqual } from 'lodash';
import { IAnswer } from '../../../create-survey/create-survey.interface';

@Component({
  selector: 'ac-edit-survey-edit-mode',
  templateUrl: './edit-survey-edit-mode.component.html',
  styleUrls: ['./edit-survey-edit-mode.component.scss']
})
export class EditSurveyEditModeComponent implements OnInit {
  @Input('answer') set setAnswer(value: IAnswer) {
    this.answer = value;
    this.editAnswerCopy = cloneDeep(value);
  }
  @Input() prefix: string = '';
  @Output() onSubmit: EventEmitter<IAnswer> = new EventEmitter();
  @Output() onRemoveFromChanged: EventEmitter<IAnswer> = new EventEmitter();
  editAnswerCopy: IAnswer;
  answer: IAnswer;
  isEditAnswer: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  submitChanges() {
    this.isEditAnswer = false;

    if(this.isChanged()) {
      this.onSubmit.emit(this.editAnswerCopy);
    } else {
      this.onRemoveFromChanged.emit(this.editAnswerCopy);
    }
  }

  cancelChanges() {
    this.editAnswerCopy = cloneDeep(this.answer);

    this.isEditAnswer = false;
    this.onRemoveFromChanged.emit(this.editAnswerCopy);
  }

  isChanged(): boolean {
    return !isEqual(this.answer, this.editAnswerCopy);
  }
}
