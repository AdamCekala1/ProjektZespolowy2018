import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISurvey } from '../../../../../../src/app/shared/interfaces/result.interface';

@Component({
  selector: 'ac-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent  {
  @Input() elements: ISurvey[] = [];
  @Output() onSelect: EventEmitter<ISurvey> = new EventEmitter();

  emitSurvey(survey: ISurvey) {
    this.onSelect.emit(survey);
  }
}
