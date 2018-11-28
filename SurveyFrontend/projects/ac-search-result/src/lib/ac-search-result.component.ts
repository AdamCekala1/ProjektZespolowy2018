import { Component } from '@angular/core';
import { ISearchConfig } from './shared/interfaces/search.interface';
import { SearchFormName } from './components/search/search-form-names.enum';

@Component({
  selector: 'ac-search-result',
  templateUrl: './ac-search-result.component.html',
  styleUrls: ['./ac-search-result.component.scss']
})
export class AcSearchResultComponent {
  config: ISearchConfig = {
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
        values: [],
      }
    }
  };
  title = 'app';
}
