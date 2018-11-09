import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { ResultElementComponent } from './result-element/result-element.component';
import { ResultSwitcherComponent } from './result-switcher/result-switcher.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SearchComponent, ResultElementComponent, ResultSwitcherComponent]
})
export class ResultModule { }
