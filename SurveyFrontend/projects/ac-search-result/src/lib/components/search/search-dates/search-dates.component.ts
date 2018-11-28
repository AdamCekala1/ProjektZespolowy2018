import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment_ from 'moment';
import {Moment} from 'moment';

import { ControlValueAccessorWrapper } from '../../../shared/class/control-value-accessor-wrapper.class';
import { CONSTANTS } from '../search.constants';

const momentImported = moment_;

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
  @Input() displayIcon: boolean = true;
  @Input() placeholder: string = '';
  @Input('maxDate') set setMaxDate(value: string) {
    this.maxDate = momentImported(value, CONSTANTS.DATE_FORMAT.DISPLAY).toDate();
  }
  @Input('minDate') set setMinDate(value: string) {
    const momentMinDate: Moment = momentImported(value, CONSTANTS.DATE_FORMAT.DISPLAY);

    if(this.actualDate && momentMinDate.isAfter(momentImported(this.actualDate, CONSTANTS.DATE_FORMAT.DISPLAY))) {
      this.setDate('');
    }

    this.minDate = momentMinDate.toDate();
  }
  maxDate: Date;
  minDate: Date;
  actualDate: string = '';

  constructor() {
    super();
  }

  writeValue(value: string) {
    this.actualDate = value;
  }

  setDateFromDatePicker(value: any) {
    this.setDate(momentImported(value.value).format(CONSTANTS.DATE_FORMAT.DISPLAY));
  }

  private setDate(value: string) {
    this.onChange(value);
    this.writeValue(value);
  }
}
