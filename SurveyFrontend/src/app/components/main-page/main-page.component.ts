import { Component, OnInit } from '@angular/core';
import { ISearchConfig } from '../../../../projects/ac-search-result/src/lib/shared/interfaces/search.interface';
import { SearchFormName } from '../../../../projects/ac-search-result/src/lib/components/search/search-form-names.enum';

@Component({
  selector: 'ac-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  backgroundUrl = 'assets/mainpage.jpg';
  searchConfig: ISearchConfig = {
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
  };

  constructor() { }

  ngOnInit() {
  }

}
