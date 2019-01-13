import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { get } from 'lodash';

import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchFormName } from './search-form-names.enum';
import {
  ISearchConfig,
  ISearchConfigInputs,
} from '../../shared/interfaces/search.interface';
import { IDictionary } from '../../../../../ac-login/src/lib/shared/interfaces/utils.interface';

@Component({
  selector: 'ac-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @Input('config') set setConfig(config: ISearchConfig) {
    this.config = config;

    this.createForm(config.inputs);
  }
  @Output() onSubmit: EventEmitter<IDictionary<string>> = new EventEmitter();
  config: ISearchConfig;
  form: FormGroup;
  readonly searchFormName = SearchFormName;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if(!this.form) {
      this.createForm(null);
    }
  }

  isSubmitDisabled(): boolean {
    return !this.form.valid;
  }

  submit() {
    console.log(this.form.value);

    this.onSubmit.emit(this.form.value);
  }

  private createForm(config: ISearchConfigInputs) {
    this.form = this.formBuilder.group({
      [SearchFormName.TEXT]: get(config, `[${SearchFormName.TEXT}].value`, ''),
      [SearchFormName.TYPE]: get(config, `[${SearchFormName.TYPE}].value`, ''),
      [SearchFormName.BEGIN_DATE]: get(config, `[${SearchFormName.BEGIN_DATE}].value`, ''),
      [SearchFormName.END_DATE]: get(config, `[${SearchFormName.END_DATE}].value`, ''),
    });
  }
}
