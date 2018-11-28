import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AcSearchResultComponent } from './ac-search-result.component';
import { SearchModule } from './components/search/search.module';
import { ResultModule } from './components/result/result.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AcSearchResultComponent,
  ],
  imports: [
    BrowserModule,
    SearchModule,
    SharedModule,
    ResultModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  exports: [
    AcSearchResultComponent,
    SearchModule,
  ],
  bootstrap: [AcSearchResultComponent]
})
export class AcSearchResultModule { }
