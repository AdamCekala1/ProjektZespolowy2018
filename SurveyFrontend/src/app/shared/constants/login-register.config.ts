import { ViewType } from '../../../../projects/ac-login/src/lib/shared/enums/view-type.enum';

export const regexs = {
  EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  AGE: /(?:\b|-)([1-9]{2}?|100)\b/,
};

export const LoginRegisterConfig = {
  login: {
    controls: {
      login: {
        name: 'login',
        regex: '',
        type: 'text',
        isReguired: true,
        placeholder: 'Login',
        value: '',
      },
      password: {
        name: 'password',
        regex: '',
        type: 'password',
        isReguired: true,
        placeholder: 'Hasło',
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
        placeholder: 'Wpisz imię',
        value: '',
      },
      surname: {
        name: 'surname',
        regex: '',
        type: 'text',
        isReguired: true,
        placeholder: 'Wpisz nazwisko',
        value: '',
      },
      email: {
        name: 'email',
        regex: regexs.EMAIL,
        type: 'email',
        isReguired: true,
        placeholder: 'Podaj email',
        value: '',
      },
      password: {
        name: 'password',
        regex: '',
        type: 'password',
        isReguired: true,
        placeholder: 'Wpisz hasło',
        value: '',
      },
      age: {
        name: 'age',
        regex: regexs.AGE,
        type: 'number',
        isReguired: true,
        placeholder: 'Wpisz wiek',
        value: '',
      },
      city: {
        name: 'city',
        regex: '',
        type: 'text',
        isReguired: true,
        placeholder: 'Z jakiego jesteś miasta?',
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
