import { Component } from '@angular/core';

// import { SearchFormName } from 'ac-search-result/lib/components/search/search-form-names.enum';
// import { ISearchConfig } from 'ac-search-result/lib/shared/interfaces/search.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // searchConfig: ISearchConfig = {
  //   otherSelects: [],
  //   inputs: {
  //     [SearchFormName.TEXT]: {
  //       value: 'Ankieta o ziemniakiach',
  //       isRequired: false,
  //       regex: '',
  //       title: 'xddd',
  //     },
  //     [SearchFormName.TYPE]: {
  //       title: 'Select type',
  //       value: '',
  //       isRequired: false,
  //       selectOption: {
  //         canBeNull: true,
  //         text: 'Clear selection',
  //       },
  //       values: [],
  //     }
  //   }
  // };
}
