import { Component } from '@angular/core';
import { ISearchConfig } from './shared/interfaces/search.interface';
import { SearchFormName } from './components/search/search-form-names.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
