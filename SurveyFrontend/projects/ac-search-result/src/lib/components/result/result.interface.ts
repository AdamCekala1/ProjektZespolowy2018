export interface IResultElement {
  id: string | number;
  mainSection: {
    title: string;
    subtitle?: string;
    description: string;
  };
  img?: string;
  action: {
   description?: string;
   buttonName: string;
  };
  extraInformations: IResultDisplayDetail[];
  icon?: {
    color: string;
    name: string;
    background: string;
  };
  type?: string;
  alertText?: string;
}

export interface IResultDisplayDetail {
  name: string;
  value: string;
}
