import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRouting } from './auth.routing';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MainNavComponent } from './components/main-nav/main-nav.component';

@NgModule({
  declarations: [MainNavComponent],
  imports: [
    CommonModule,
    AuthRouting,
    LayoutModule,
    SharedModule
  ]
})

export class AuthModule {}
