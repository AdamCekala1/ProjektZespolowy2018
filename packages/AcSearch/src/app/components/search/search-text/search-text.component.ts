import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorWrapper } from '../../../shared/class/control-value-accessor-wrapper.class';

@Component({
  selector: 'app-search-text',
  templateUrl: './search-text.component.html',
  styleUrls: ['./search-text.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SearchTextComponent,
    multi: true,
  }],
})
export class SearchTextComponent extends ControlValueAccessorWrapper implements OnInit, ControlValueAccessor {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
