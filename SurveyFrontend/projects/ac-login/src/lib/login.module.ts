import { ModuleWithProviders, NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule } from '@angular/material';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DictionaryToArrayPipe } from './shared/pipes/dictionary-to-array.pipe';
import { LoginService } from './login.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent,
    FormComponent,
    DictionaryToArrayPipe,
  ],
  imports: [
    CommonModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LoginModule,
      providers: [ LoginService ]
    };
  }
}
