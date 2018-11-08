import { IDictionary } from './utils.interface';
import { ErrorType } from '../enums/error-type.enum';

export interface IErrorGlobal {
  login?: IError;
  register?: IError;
}

export interface IError {
  controls?: IDictionary<IErrorControl>;
  underForm?: IErrorUnderForm[];
}

export interface IErrorControl {
  name: string;
  value: string;
}

export interface IErrorUnderForm {
  type: ErrorType;
  value: string;
}
