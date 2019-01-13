import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { forEach, set } from 'lodash';
import { IInputConfig, ISearchConfigInputs, ISearchMainSelect } from './shared/interfaces/search.interface';
import { IDictionary } from '../../../../src/app/shared/interfaces/utils.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AcSearchResultService {
  mapConfigControlsToFormControls(controllsInput: ISearchConfigInputs): IDictionary<any> {
    const controls: IDictionary<any> = {};

    forEach(controllsInput, (control: IInputConfig | ISearchMainSelect, name: string) => {
      const controlValidators: any[] = [];

      if(control.isRequired) {
        controlValidators.push(Validators.required);
      }

      if((control as IInputConfig).regex) {
        controlValidators.push(Validators.pattern((control as IInputConfig).regex));
      }

      set(controls, name, [control.value, controlValidators]);
    });

    return controls;
  }
}
