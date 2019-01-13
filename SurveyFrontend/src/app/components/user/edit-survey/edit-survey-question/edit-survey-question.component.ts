import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAnswer, IAnswerWithType, IQuestion } from '../../../create-survey/create-survey.interface';
import { ItemType } from '../item-type.enum';
import { find, remove} from 'lodash';

@Component({
  selector: 'ac-edit-survey-question',
  templateUrl: './edit-survey-question.component.html',
  styleUrls: ['./edit-survey-question.component.scss']
})
export class EditSurveyQuestionComponent {
  @Input() question: IQuestion;
  @Output() onChanged: EventEmitter<IAnswerWithType[]> = new EventEmitter();
  readonly itemType = ItemType;
  private changedItems: IAnswerWithType[] = [];

  removeFromChanged(changed: IAnswer) {
    remove(this.changedItems, {id: changed.id});

    this.onChanged.emit(this.changedItems);
  }

  addToChanged(changed: IAnswer, type: ItemType) {
    const newValue: IAnswerWithType =  {...changed, type};
    let foundChangedItem: IAnswerWithType = find(this.changedItems, {id: changed.id});

    if(foundChangedItem) {
      foundChangedItem = newValue;
    } else{
      this.changedItems.push(newValue);
    }

    this.onChanged.emit(this.changedItems);
  }
}
