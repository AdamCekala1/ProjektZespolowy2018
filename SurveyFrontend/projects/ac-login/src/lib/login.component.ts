import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { merge } from 'lodash';

import { LoginService } from './login.service';
import { ViewType } from './shared/enums/view-type.enum';
import { IConfigGlobal } from './shared/interfaces/config.interface';
import { IErrorGlobal } from './shared/interfaces/error.interface';
import { IDictionary } from './shared/interfaces/utils.interface';
import { configMock } from './mocks/config.mock';
import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'ac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(350)
      ]),
      transition(':leave', [
        group([
          animate('0.7s ease', style({
            transform: 'translateY(-100%)'
          })),
          animate('0.7s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class LoginComponent {
  @Input() isDisplayed: boolean = true;
  @Input('config') set setConfig(config: IConfigGlobal) {
    console.log('config', config)
    this.handleConfigDetails(config);
  };
  @Input() errors: IErrorGlobal = {};
  @Input() backgroundUrl: string = 'assets/background.jpg';
  @Output() onSubmit: EventEmitter<IDictionary<string | number>> = new EventEmitter();
  config: IConfigGlobal;
  readonly viewType = ViewType;

  constructor(private appService: LoginService) {
  }

  getActiveView(): Observable<ViewType> {
    return this.appService.getActiveView();
  }

  submit(data: any, type: ViewType) {
    this.onSubmit.emit(merge(data, {type}));
  }

  closeModal() {
    this.appService.hideModal();
  }

  private handleConfigDetails(config: IConfigGlobal) {
    // TODO: remove mock and add config
    this.config = config;

    console.log('x', config)
    this.appService.setCanActivateViewByConfig(this.config);
  }
}
