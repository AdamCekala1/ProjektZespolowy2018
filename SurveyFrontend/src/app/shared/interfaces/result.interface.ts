import { IUser } from './user.interface';

export interface ISurvey {
  id: string | number;
  mainSection: {
    title: string;
    subtitle?: string;
    description?: string;
  };
  img?: string;
  action?: {
   description?: string;
   buttonName: string;
  };
  extraInformations: IExtraInformations[];
  icon?: {
    color: string;
    name: string;
    background: string;
  };
  type?: string;
  alertText?: string;
  questions: ISurveyQuestion[];
  response: ISurveyResponse;
}

export interface ISurveyQuestion {
  content: string;
  id: number;
  answers: ISurveyAnswer[];
}

export interface ISurveyAnswer {
  id: number;
  content: string;
}

export interface IExtraInformations {
  name: string;
  value: string;
}

export interface ISurveyResponse {
  created_at: string;
  id: number;
  question: ISurveyQuestion[];
  owner: IUser;
  title: string;
  updated_at: string;
  accept?: boolean;
}

export interface ISurveyResolve {
  answer_id: number;
  question_id: number;
}
