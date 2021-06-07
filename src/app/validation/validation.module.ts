import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationComponent } from './validation.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ValidationComponent, SignInComponent],
  imports: [
    CommonModule,
    ValidationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ValidationModule {}
