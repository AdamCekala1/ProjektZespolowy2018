import { ViewType } from '../../../../projects/ac-login/src/lib/shared/enums/view-type.enum';

export const LoginRegisterConfig = {
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
}
