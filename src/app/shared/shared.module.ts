import { NgModule } from '@angular/core';

import { MaterialModule } from './modules/material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';
import { UnixDateShowPipe } from './pipes/unix-date-show.pipe';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    UnixDateShowPipe
  ],
  imports: [
    MaterialModule,
    RouterModule,
  ],
  exports: [
    MaterialModule,
    UnixDateShowPipe
  ]
})

export class SharedModule {}
