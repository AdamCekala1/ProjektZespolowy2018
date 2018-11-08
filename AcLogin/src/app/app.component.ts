import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { AppService } from './app.service';
import { ViewType } from './shared/enums/view-type.enum';
import { IConfigGlobal } from './shared/interfaces/config.interface';
import { IErrorGlobal } from './shared/interfaces/error.interface';
import { IDictionary } from './shared/interfaces/utils.interface';
import { configMock } from './mocks/config.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  @Input() isDisplayed: boolean = true;
  @Input('config') set setConfig(config: IConfigGlobal) {
    this.handleConfigDetails(config);
  };
  @Input() errors: IErrorGlobal = {};
  @Input() backgroundUrl: string = 'assets/background.jpg';
  @Output() onSubmit: EventEmitter<IDictionary<string | number>> = new EventEmitter();
  config: IConfigGlobal;
  readonly viewType = ViewType;

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.handleConfigDetails({} as any);
  }

  getActiveView(): Observable<ViewType> {
    return this.appService.getActiveView();
  }

  submit(data: any) {
    this.onSubmit.emit(data);
  }

  private handleConfigDetails(config: IConfigGlobal) {
    // TODO: remove mock and add config
    this.config = configMock;

    this.appService.setCanActivateViewByConfig(this.config);
  }
}
