import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { get } from 'lodash';

import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchFormName } from './search-form-names.enum';
import {
  ISearchConfig,
  ISearchConfigInputs,
} from '../../shared/interfaces/search.interface';
import { AcSearchResultService } from '../../ac-search-result.service';
import { IDictionary } from '../../../../../ac-login/src/lib/shared/interfaces/utils.interface';

@Component({
  selector: 'ac-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
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

  constructor(private formBuilder: FormBuilder,
              private appService: AcSearchResultService) { }

  //            TODO: refactor
  ngOnInit() {
    if(!this.form) {
      this.form = this.formBuilder.group({
        [SearchFormName.TEXT]: '',
        [SearchFormName.TYPE]: '',
        [SearchFormName.BEGIN_DATE]: '',
        [SearchFormName.END_DATE]: '',
      });
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
      [SearchFormName.TEXT]: '',
      [SearchFormName.TYPE]: '',
      [SearchFormName.BEGIN_DATE]: '',
      [SearchFormName.END_DATE]: '',
    });
  //       this.form = this.formBuilder.group(this.appService.mapConfigControlsToFormControls(config));
    //     console.log(this.form)
  }
}
