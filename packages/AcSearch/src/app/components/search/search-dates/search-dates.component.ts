import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorWrapper } from '../../../shared/class/control-value-accessor-wrapper.class';

@Component({
  selector: 'app-search-dates',
  templateUrl: './search-dates.component.html',
  styleUrls: ['./search-dates.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SearchDatesComponent,
    multi: true,
  }],
})
export class SearchDatesComponent extends ControlValueAccessorWrapper implements OnInit, ControlValueAccessor {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
