import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchTextComponent } from './search-text/search-text.component';
import { SearchDatesComponent } from './search-dates/search-dates.component';
import { SearchSelectComponent } from './search-select/search-select.component';
import { SearchSubmitComponent } from './search-submit/search-submit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchComponent, SearchTextComponent, SearchDatesComponent, SearchSelectComponent, SearchSubmitComponent]
})
export class SearchModule { }
