import { Component, OnInit } from '@angular/core';
import { omit } from 'lodash';
import { LoginService } from '../../../../projects/ac-login/src/lib/login.service';
import { HttpService } from '../../core/http/http.service';
import { RequestTypes } from '../../core/http/http.enum';
import { ViewType } from '../../../../projects/ac-login/src/lib/shared/enums/view-type.enum';
import { IConfigGlobal } from '../../../../projects/ac-login/src/lib/shared/interfaces/config.interface';
import { IDictionary } from '../../shared/interfaces/utils.interfaces';
import { RequestsContants } from '../../shared/constants/requests.contants';

@Component({
  selector: 'ac-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  loginRegisterConfig: IConfigGlobal = {
    login: {
      controls: {
        login: {
          name: 'login',
          regex: '',
          type: 'text',
          isReguired: true,
          placeholder: 'Type login',
          value: '',
        },
        password: {
          name: 'password',
          regex: '',
          type: 'password',
          isReguired: true,
          placeholder: 'Type password',
          value: '',
        }
      },
      title: 'Login',
      actionButtonTitle: 'Login',
      redirectSection: {
        goTo: ViewType.REGISTER,
        question: 'Nie masz konta?',
        actionText: 'Utwórz je!',
      }
    },
    register: {
      controls: {
        name: {
          name: 'name',
          regex: '',
          type: 'text',
          isReguired: true,
          placeholder: 'Type name',
          value: '',
        },
        surname: {
          name: 'surname',
          regex: '',
          type: 'text',
          isReguired: true,
          placeholder: 'Type surname',
          value: '',
        },
        email: {
          name: 'email',
          regex: '',
          type: 'email',
          isReguired: true,
          placeholder: 'Type email',
          value: '',
        },
        password: {
          name: 'password',
          regex: '',
          type: 'password',
          isReguired: true,
          placeholder: 'Type password',
          value: '',
        },
        age: {
          name: 'age',
          regex: '',
          type: 'number',
          isReguired: true,
          placeholder: 'Type agw',
          value: '',
        },
        city: {
          name: 'city',
          regex: '',
          type: 'text',
          isReguired: true,
          placeholder: 'Type city',
          value: '',
        }
      },
      title: 'Register',
      actionButtonTitle: 'Register',
      redirectSection: {
        goTo: ViewType.LOGIN,
        question: 'Masz już konto?',
        actionText: 'Zaloguj się!',
      }
    }
  };

  constructor(private loginService: LoginService, private httpService: HttpService) { }

  openLogin() {
    this.loginService.displayLogin();
  }

  openRegister() {
    this.loginService.displayRegister();
  }

  submitData(data: IDictionary<string | number>) {
    if(data.type === ViewType.REGISTER) {
      this.httpService.httpRequest(RequestsContants.Authorization.REGISTER, RequestTypes.POST, {
        queryObj: omit(data, 'type'),
      }).subscribe(x => console.log(x))
    } else {
      this.httpService.httpRequest(RequestsContants.Authorization.LOGIN, RequestTypes.POST, {
        queryObj: omit(data, 'type'),
      }).subscribe(x => console.log(x))
    }
  }
}
