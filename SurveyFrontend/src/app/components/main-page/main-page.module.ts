import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from '../../shared/shared.module';
import { AcSearchResultModule } from '../../../../projects/ac-search-result/src/lib/ac-search-result.module';
import { AlertConfig, AlertModule } from 'ngx-alerts';
import { alertConfig } from '../../shared/constants/alert.config';
import { SurveysService } from '../../core/surveys/surveys.service';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    AlertModule.forRoot(alertConfig as AlertConfig),
    CommonModule,
    SharedModule,
    AcSearchResultModule,
  ],
  providers: [SurveysService],
  exports: [MainPageComponent]
})
export class MainPageModule { }
