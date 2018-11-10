import { Component, Input, OnInit } from '@angular/core';
import { get } from 'lodash';

import { CONSTANTS } from './search.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('config') set setConfig(config: any) {
    const numberOfElements: number = CONSTANTS.NUMBER_OF_ELEMENTS.MIN_GENERAL + get(config, 'inputs.selects.lenght', 0);

    this.numbersOfElementsPerLine = CONSTANTS.NUMBER_OF_ELEMENTS.MAX_PER_LINE < numberOfElements
      ? CONSTANTS.NUMBER_OF_ELEMENTS.MAX_PER_LINE
      : numberOfElements;
    this.config = config;
  }
  config;
  private numbersOfElementsPerLine: number = 3;
  constructor() { }

  ngOnInit() {
  }

}
