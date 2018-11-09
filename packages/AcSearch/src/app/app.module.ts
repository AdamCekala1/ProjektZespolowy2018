import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchModule } from './components/search/search.module';
import { ResultModule } from './components/result/result.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SearchModule,
    ResultModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
