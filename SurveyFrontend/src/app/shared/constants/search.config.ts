import { SearchFormName } from '../../../../projects/ac-search-result/src/lib/components/search/search-form-names.enum';

export const searchConfig = {
  otherSelects: [],
  inputs: {
    [SearchFormName.TEXT]: {
      value: 'Ankieta o ziemniakiach',
      isRequired: false,
      regex: '',
      title: 'xddd',
    },
    [SearchFormName.TYPE]: {
      title: 'Select type',
      value: '',
      isRequired: false,
      selectOption: {
        canBeNull: true,
        text: 'Clear selection',
      },
      values: ['x', 'y', 'z2'],
    }
  }
}
