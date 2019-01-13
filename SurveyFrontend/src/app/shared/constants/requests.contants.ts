import { ViewType } from '../../../../projects/ac-login/src/lib/shared/enums/view-type.enum';

export class RequestsContants {
  static prefix = 'http://pdrab.nazwa.pl/projekt2018/Backend/public/';

  static Authorization = {
    [ViewType.LOGIN]: 'account/security/token',
    [ViewType.REGISTER]: 'account/security/register',
  };

  static USER = 'api/account/about';

  static SURVEYS = {
    RESPONSE: 'response/add',
    USER: 'api/questionnaire/list-user',
    LIST: 'questionnaire/list-all',
    EDIT: 'api/questionnaire/edit',
    ADD: 'api/questionnaire/add',
    STATISTIC: 'response/get/',
    ADMIN_LIST: 'api/admin/questionnaire/list-all',
    SINGLE: (id: number) => `questionnaire/${id}/get`,
    ACCEPT: (id: number) => `api/admin/accept/${id}`,
    DELETE: (id: number) => `api/questionnaire/${id}/delete`,
  };
}
