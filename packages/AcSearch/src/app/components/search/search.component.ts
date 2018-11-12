import { Component, Input, OnInit } from '@angular/core';
import { compact, get, map } from 'lodash';

import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchFormName } from './search-form-names.enum';
import { ISearchConfig } from '../../shared/interfaces/search.interface';
import { ISelectConfig } from '../../shared/select/select.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('config') set setConfig(config: ISearchConfig) {
    this.config = config;
  }
  config: ISearchConfig;
  form: FormGroup;
  readonly searchFormName = SearchFormName;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      [SearchFormName.TEXT]: '',
      [SearchFormName.TYPE]: '',
      [SearchFormName.BEGIN_DATE]: '',
      [SearchFormName.END_DATE]: '',
    });
  }

  isSubmitDisabled(): boolean {
    return !(this.form.valid && compact(map(this.form.value, (value: string) => value)).length);
  }

  getMainSelectConfig(): ISelectConfig {
    return get(this.config, 'inputs.selects.mainSelect', null);
  }

  submit() {
    console.log(this.form.value);
  }
}
