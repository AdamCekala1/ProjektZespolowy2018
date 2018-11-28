import { ViewType } from '../enums/view-type.enum';
import { IDictionary } from './utils.interface';

export interface IConfigGlobal {
  login?: IConfig;
  register?: IConfig;
}

export interface IConfig {
  controls: IDictionary<IConfigControl>;
  title: string;
  actionButtonTitle: string;
  redirectSection?: IConfigRedirectSpace;
}

export interface IConfigControl {
  name: string;
  regex: string;
  type: string;
  isReguired: boolean;
  placeholder: string;
  value: string;
}

export interface IConfigRedirectSpace {
  goTo: ViewType;
  question: string;
  actionText: string;
}

export interface IIsAvaibleView {
  login: boolean;
  register: boolean;
}
