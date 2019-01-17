import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal.component';
import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ModalComponent,
    LoaderComponent,
    CategoriesComponent,
  ],
  declarations: [ModalComponent, LoaderComponent, CategoriesComponent]
})
export class SharedModule { }
