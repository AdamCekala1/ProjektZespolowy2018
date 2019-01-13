import { ItemType } from '../user/edit-survey/item-type.enum';

export interface IQuestion extends IAnswer {
  answers: IAnswer[];
}

export interface IAnswer {
  content: string;
  id?: number;
  active?: boolean;
}

export interface IAnswerWithType extends IAnswer {
  type: ItemType;
}

