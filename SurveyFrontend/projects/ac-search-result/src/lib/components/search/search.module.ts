import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchTextComponent } from './search-text/search-text.component';
import { SearchDatesComponent } from './search-dates/search-dates.component';
import { SearchSelectComponent } from './search-select/search-select.component';
import { SearchSubmitComponent } from './search-submit/search-submit.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    SearchComponent,
    SearchTextComponent,
    SearchDatesComponent,
    SearchSelectComponent,
    SearchSubmitComponent,
  ],
  exports: [SearchComponent]
})
export class SearchModule { }
