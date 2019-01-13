import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    HttpClientModule,
  ],
  exports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ModalComponent,
  ],
  declarations: [ModalComponent]
})
export class SharedModule { }
