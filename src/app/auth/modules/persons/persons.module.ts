import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonsRouting } from './persons.routing';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { NewComponent } from './pages/new/new.component';
import { DetailComponent } from './pages/detail/detail.component';
import { IndexComponent } from './pages/index/index.component';
import { PersonsTableComponent } from './components/persons-table/persons-table.component';
import { PersonService } from './services/persons.service';

@NgModule({
  declarations: [
    PersonFormComponent,
    PersonsTableComponent,
    IndexComponent,
    DetailComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    PersonsRouting,
    SharedModule
  ],
  providers: [
    PersonService
  ]
})

export class PersonsModule {}
