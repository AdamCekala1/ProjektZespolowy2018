import { Component } from '@angular/core';
import { ISearchConfig } from './shared/interfaces/search.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  config: ISearchConfig = {
    inputs: {
      selects: {
        mainSelect: {
          title: 'Select type',
          selectOption: {
            noOption: {
              canBeNull: true,
              text: 'Clear selection',
            },
          },
        },
        otherSelects: [],
      }
    }
  };
  title = 'app';
}
