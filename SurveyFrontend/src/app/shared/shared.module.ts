import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ModalComponent,
    LoaderComponent,
  ],
  declarations: [ModalComponent, LoaderComponent]
})
export class SharedModule { }
