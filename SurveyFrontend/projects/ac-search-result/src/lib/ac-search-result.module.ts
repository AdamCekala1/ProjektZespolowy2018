import { NgModule } from '@angular/core';

import { SearchModule } from './components/search/search.module';
import { ResultModule } from './components/result/result.module';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SearchModule,
    SharedModule,
    ResultModule,
  ],
  providers: [],
  exports: [
    SearchModule,
    ResultModule,
  ],
})
export class AcSearchResultModule { }
