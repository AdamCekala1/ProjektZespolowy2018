import { ISelectConfig } from '../select/select.interface';

export interface ISearchConfig {
  inputs: {
    selects?: {
      mainSelect?: ISearchMainSelect;
      otherSelects?: any[];
    };
  };
}

export interface ISearchMainSelect {
  title: string;
  selectOption?: ISelectConfig;
}
