import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRouting } from './trips.routing';
import { IndexComponent } from './pages/index/index.component';
import { TripsTableComponent } from './components/trips-table/trips-table.component';
import { SharedModule } from '../../../shared/shared.module';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { NewComponent } from './pages/new/new.component';
import { DetailComponent } from './pages/detail/detail.component';

@NgModule({
  declarations: [
    IndexComponent,
    TripsTableComponent,
    TripFormComponent,
    NewComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    TripsRouting,
    SharedModule
  ]
})

export class TripsModule {}
