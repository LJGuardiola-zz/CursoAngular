import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Person } from '../../../../core/domain/person';
import { Trip } from '../../../../core/domain/trip';
import { Bus } from '../../../../core/domain/bus';
import { Model } from '../../../../core/domain/model';
import { Brand } from '../../../../core/domain/brand';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  constructor(
    private http: HttpClient
  ) {}

  private static makeTrip(data: any): Trip {
    return new Trip(
      data.id,
      data.departure,
      data.destination,
      data.startDate,
      data.endDate,
      new Bus(
        data.bus.id,
        data.bus.licensePlate,
        new Model(
          data.bus.model.id,
          data.bus.model.name,
          new Brand(
            data.bus.model.brand.id,
            data.bus.model.brand.name,
            data.bus.model.brand.models
          )
        ),
        data.bus.numberOfSeats
      ),
      data.passengers.map(
        (item: any) => new Person(item.id, item.firstName, item.lastName, item.age)
      )
    );
  }

  getAll(): Observable<Trip[]> {
    return this.http
      .get<any>(environment.api.url + 'trips')
      .pipe(
        catchError(() => {
          return throwError('El servidor no pudo procesar la solicitud.')
        }),
        map(data => data.map(
          (item: any) => TripsService.makeTrip(item)
        ))
      );
  }

  get(id: number): Observable<Trip> {
    return this.http
      .get<any>(environment.api.url + 'trips/' + id)
      .pipe(
        catchError(error => {
          switch (error.status) {
            case 404:
              return throwError('El viaje no fue encontrado.');
            default:
              return throwError('El servidor no pudo procesar la solicitud.')
          }
        }),
        map(data => TripsService.makeTrip(data))
      );
  }

  create(trip: any): Observable<any> {
    return this.http
      .post<any>(environment.api.url + 'trips', trip)
      .pipe(
        catchError(() => {
          return throwError('El viaje no pudo ser creado.');
        })
      );
  }

  update(trip: any): Observable<any> {
    return this.http
      .put<any>(environment.api.url + 'trips', trip)
      .pipe(
        catchError(() => {
          return throwError('El viaje no pudo ser actualizado.');
        })
      );
  }

}
