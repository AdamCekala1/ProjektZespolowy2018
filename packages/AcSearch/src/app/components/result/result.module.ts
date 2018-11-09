import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultElementComponent } from './result-element/result-element.component';
import { ResultSwitcherComponent } from './result-switcher/result-switcher.component';
import { ResultComponent } from './result.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ResultComponent,
    ResultElementComponent,
    ResultSwitcherComponent,
  ],
  exports: [ResultComponent],
})
export class ResultModule {
}
