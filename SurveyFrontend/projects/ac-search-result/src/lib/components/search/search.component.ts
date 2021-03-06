import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { get } from 'lodash';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    if(!this.form) {
      this.createForm(config.inputs);
    }
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

  submit(isAll: boolean = false) {
    this.onSubmit.emit(isAll ? null : this.form.value);
  }

  private createForm(config: ISearchConfigInputs) {
    this.form = this.formBuilder.group({
      [SearchFormName.TEXT]: get(config, `[${SearchFormName.TEXT}].value`, ''),
      [SearchFormName.TYPE]: [get(config, `[${SearchFormName.TYPE}].value`, ''), Validators.required],
      [SearchFormName.BEGIN_DATE]: [get(config, `[${SearchFormName.BEGIN_DATE}].value`, ''), Validators.required],
      [SearchFormName.END_DATE]: [get(config, `[${SearchFormName.END_DATE}].value`, ''), Validators.required],
    });
  }
}
