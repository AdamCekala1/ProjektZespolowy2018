import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { forEach, get, set } from 'lodash';
import { Observable } from 'rxjs';

import { AppService } from '../../app.service';
import { IDictionary } from '../../shared/interfaces/utils.interface';
import { ErrorType } from '../../shared/enums/error-type.enum';
import { ViewType } from '../../shared/enums/view-type.enum';
import { IConfig, IIsAvaibleView } from '../../shared/interfaces/config.interface';
import { IError } from '../../shared/interfaces/error.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  @Input('config') set setFormGroup(config: IConfig) {
    this.config = config;

    this.form = this.formBuilder.group(this.appService.mapConfigControlsToFormControls(this.config.controls));
  }
  @Input('errors') set setErrors(errors: IError) {
    this.handleErrors(errors);
  }
  @Output() onSubmit: EventEmitter<IDictionary<string | number>> = new EventEmitter();
  config: IConfig;
  errors: IError;
  form: FormGroup;
  readonly errorType = ErrorType;

  constructor(private formBuilder: FormBuilder,
              private changeDetectorRef: ChangeDetectorRef,
              private appService: AppService) {
  }

  canDisplayViews(): Observable<IIsAvaibleView> {
    return this.appService.getCanActivateView();
  }

  changeView(newView: ViewType) {
    this.appService.setActiveView(newView);
  }

  clearControlErrors(controlName: string) {
    if(get(this.errors, 'controls')) {
      this.errors.controls[controlName] = null;

      this.changeDetectorRef.detectChanges();
    }
  }

  submit() {
    this.onSubmit.emit(this.form.valid ? this.form.value : null);
  }

  private handleErrors(errors: IError) {
    if(this.form && errors) {
      this.errors = errors;

      forEach(errors.controls, (controlError: any, index: number) => {
        const foundInvalidControl: AbstractControl = this.form.get(controlError.name);

        if(foundInvalidControl) {
          foundInvalidControl.setErrors({['configError' + index]: controlError.value});
          foundInvalidControl.markAsTouched();
        }
      });
    }
  }
}
