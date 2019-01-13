import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ac-create-survey-add-question-answer',
  templateUrl: './create-survey-add-question-answer.component.html',
  styleUrls: ['./create-survey-add-question-answer.component.scss']
})
export class CreateSurveyAddQuestionAnswerComponent implements OnInit {
  content: string = '';
  @Output() onAccept: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addAnswer() {
    this.onAccept.emit(this.content);
  }

  cancelAnswer() {
    this.content = '';

    this.onAccept.emit('');
  }
}
