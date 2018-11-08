import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule } from '@angular/material';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictionaryToArrayPipe } from './shared/pipes/dictionary-to-array.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DictionaryToArrayPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
