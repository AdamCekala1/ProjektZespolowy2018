import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorWrapper } from '../../../shared/class/control-value-accessor-wrapper.class';
import { ISearchMainSelect } from '../../../shared/interfaces/search.interface';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SearchSelectComponent,
    multi: true,
  }],
})
export class SearchSelectComponent extends ControlValueAccessorWrapper implements ControlValueAccessor {
  @Input() config: ISearchMainSelect;
  textSelect: string = 'genre';
  actualValue: string;

  constructor() {
    super();
  }

  writeValue(value: string) {
    this.actualValue = value;
  }

  selectValue(value: string) {
    this.onChange(value);
    this.writeValue(value);
  }
}
