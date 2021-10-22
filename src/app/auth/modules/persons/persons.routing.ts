import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NewComponent } from './pages/new/new.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'detail/:id', component: DetailComponent },
  { path: 'new', component: NewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonsRouting {}
