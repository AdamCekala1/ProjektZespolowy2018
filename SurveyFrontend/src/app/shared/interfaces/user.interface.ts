import { ISurveyResponse } from './result.interface';
import { UserRoles } from '../enums/user-roles.enum';

export interface IUser {
  name: string;
  surname: string;
  email: string;
  age: number;
  city: string;
  password: string;
  roles:  UserRoles[];
  questionnaires: ISurveyResponse[];
}
