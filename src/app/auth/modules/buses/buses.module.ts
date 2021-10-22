import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusesRouting } from './buses.routing';
import { IndexComponent } from './pages/index/index.component';
import { NewComponent } from './pages/new/new.component';
import { DetailComponent } from './pages/detail/detail.component';
import { BusFormComponent } from './components/bus-form/bus-form.component';
import { BusesTableComponent } from './components/buses-table/buses-table.component';
import { SharedModule } from '../../../shared/shared.module';
import { BusesService } from './services/buses.service';

@NgModule({
  declarations: [
    IndexComponent,
    NewComponent,
    DetailComponent,
    BusFormComponent,
    BusesTableComponent
  ],
  imports: [
    CommonModule,
    BusesRouting,
    SharedModule
  ],
  providers: [
    BusesService
  ]
})

export class BusesModule {}
