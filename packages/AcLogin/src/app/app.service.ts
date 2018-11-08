import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { forEach, get, isNil, set } from 'lodash';

import { BehaviorSubject } from 'rxjs';
import { ViewType } from './shared/enums/view-type.enum';
import { IDictionary } from './shared/interfaces/utils.interface';
import { IConfigControl, IConfigGlobal, IIsAvaibleView } from './shared/interfaces/config.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private activeView: BehaviorSubject<ViewType> = new BehaviorSubject(ViewType.LOGIN);
  private canBeActivated: BehaviorSubject<IIsAvaibleView> = new BehaviorSubject({login: false, register: false});

  getActiveView(): BehaviorSubject<ViewType> {
    return this.activeView;
  }

  setActiveView(value: ViewType) {
    if(this.getCanActivateViewValue()[value]) {
      this.getActiveView().next(value);
    }
  }

  displayRegister() {
    this.setActiveView(ViewType.REGISTER);
  }

  displayLogin() {
    this.setActiveView(ViewType.LOGIN);
  }

  getCanActivateView(): BehaviorSubject<IIsAvaibleView> {
    return this.canBeActivated;
  }

  getCanActivateViewValue(): IIsAvaibleView {
    return this.getCanActivateView().getValue();
  }

  setCanActivateView(value: IIsAvaibleView) {
    this.getCanActivateView().next(value);
  }

  setCanActivateViewByConfig(config: IConfigGlobal) {
    this.setCanActivateView({
      login: !isNil(get(config, 'login.controls')),
      register: !isNil(get(config, 'register.controls')),
    });
  }

  mapConfigControlsToFormControls(controllsInput: IDictionary<IConfigControl>): IDictionary<any> {
    const controls: IDictionary<any> = {};

    forEach(controllsInput, (control: any) => {
      const controlValidators: any[] = [];

      if(control.isReguired) {
        controlValidators.push(Validators.required);
      }

      if(control.regex) {
        controlValidators.push(Validators.pattern(control.regex));
      }

      set(controls, control.name, [control.value, controlValidators]);
    });

    return controls;
  }
}
