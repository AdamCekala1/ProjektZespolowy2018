import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';

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
export class SearchDatesComponent extends ControlValueAccessorWrapper implements ControlValueAccessor {
  actualDate: string = '';

  constructor() {
    super();
  }

  writeValue(value: string) {
    this.actualDate = value;
  }

  setDateFromDatePicker(value: any) {
    this.setDate(moment(value.value).format('DD/MM/YYYY'));
  }

  private setDate(value: string) {
    this.onChange(value);
    this.writeValue(value);
  }
}
