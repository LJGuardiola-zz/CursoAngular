import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';

const routes: Routes = [
  {
    path: '',
    component: MainNavComponent,
    children: [
      { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
      { path: 'persons', loadChildren: () => import('./modules/persons/persons.module').then(m => m.PersonsModule) },
      { path: 'buses', loadChildren: () => import('./modules/buses/buses.module').then(m => m.BusesModule) },
      { path: 'trips', loadChildren: () => import('./modules/trips/trips.module').then(m => m.TripsModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRouting {}
