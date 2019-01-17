import { SearchFormName } from '../../../../projects/ac-search-result/src/lib/components/search/search-form-names.enum';

export const searchConfig = {
  otherSelects: [],
  inputs: {
  //   [SearchFormName.TEXT]: {
  //     value: 'Ankieta o ziemniakiach',
  //     isRequired: false,
  //     regex: '',
  //     title: 'xddd',
  //   },
    [SearchFormName.TYPE]: {
      title: 'Wybierz kategorię',
      value: '',
      isRequired: true,
      selectOption: {
        canBeNull: false,
        // text: 'Wyczyść wybór',
      },
      values: [],
    }
  }
};
