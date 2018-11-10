import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule, MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  declarations: []
})
export class SharedModule { }
