import { ISelectConfig } from '../select/select.interface';
import { SearchFormName } from '../../components/search/search-form-names.enum';

export interface ISearchConfig {
  inputs: ISearchConfigInputs;
  otherSelects?: any[];
}

export interface ISearchMainSelect {
  title: string;
  selectOption?: ISelectConfig;
  values: string[];
  value: string;
  isRequired: boolean;
}

export interface IInputConfig {
  title: string;
  regex: string;
  isRequired: boolean;
  value: string;
}

export interface ISearchConfigInputs {
  [SearchFormName.TEXT]?: IInputConfig;
  [SearchFormName.END_DATE]?: IInputConfig;
  [SearchFormName.BEGIN_DATE]?: IInputConfig;
  [SearchFormName.TYPE]?: ISearchMainSelect;
}
