import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { SharedModule } from '../../shared/shared.module';
import { AcSearchResultModule } from '../../../../projects/ac-search-result/src/lib/ac-search-result.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AcSearchResultModule,
  ],
  exports: [MainPageComponent]
})
export class MainPageModule { }
