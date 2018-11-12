import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorWrapper } from '../class/control-value-accessor-wrapper.class';
import { ISelectConfig } from './select.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectComponent,
    multi: true,
  }],
})
export class SelectComponent extends ControlValueAccessorWrapper implements ControlValueAccessor {
  @Input() values: string[] = [];
  @Input() config: ISelectConfig = {};
  @Output() onSelect: EventEmitter<string> = new EventEmitter();
  actualValue: string;
  isDisplayed: boolean = false;

  constructor() {
    super();
  }

  writeValue(value: string) {
    this.actualValue = value;
  }

  selectValue(value: string) {
    this.onChange(value);
    this.writeValue(value);

    this.isDisplayed = false;
    this.onSelect.emit(value);
  }

  toggleDisplay() {
    this.isDisplayed = !this.isDisplayed;
  }
}
