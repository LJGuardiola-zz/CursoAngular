import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRouting } from './login.routing';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    LoginRouting,
    SharedModule
  ]
})

export class LoginModule {}
