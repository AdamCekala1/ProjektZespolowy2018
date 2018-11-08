// ONLY FOR TESTS
import { ViewType } from '../shared/enums/view-type.enum';

export const configMock = {
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
      registerUser: {
        name: 'registerUser',
        regex: '',
        type: 'text',
        isReguired: true,
        placeholder: 'Type name',
        value: '',
      },
      registerLogin: {
        name: 'registerLogin',
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
    title: 'Register',
    actionButtonTitle: 'Register',
    redirectSection: {
      goTo: ViewType.LOGIN,
      question: 'Masz już konto?',
      actionText: 'Zaloguj się!',
    }
  }
}
