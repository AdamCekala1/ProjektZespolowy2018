import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorWrapper } from '../../../shared/class/control-value-accessor-wrapper.class';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SearchTextComponent,
    multi: true,
  }],
})
export class SearchTextComponent extends ControlValueAccessorWrapper implements ControlValueAccessor {
  @Input() title: string = '';
  actualValue: string = '';

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
