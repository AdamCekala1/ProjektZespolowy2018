import { ErrorType } from '../shared/enums/error-type.enum';

export const errorMock = {
  login: {
    controls: {
      password: {
        name: 'password',
        value: 'Błędne hasło!',
      }
    },
    underForm: [{
      type: ErrorType.ERROR,
      value: 'Zle hasło!',
    }, {
      type: ErrorType.WARNING,
      value: 'cos poszło nie tego :('
    }]
  },
};
