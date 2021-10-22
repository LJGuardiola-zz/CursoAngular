import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Bus } from '../../../../core/domain/bus';
import { Model } from '../../../../core/domain/model';
import { Brand } from '../../../../core/domain/brand';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BusesService {

  constructor(
    private http: HttpClient
  ) {}

  private static makeBus(data: any): Bus {
    return new Bus(
      data.id,
      data.licensePlate,
      new Model(
        data.model.id,
        data.model.name,
        new Brand(
          data.model.brand.id,
          data.model.brand.name,
          data.model.brand.models
        )
      ),
      data.numberOfSeats
    );
  }

  getBrands(): Observable<Brand[]> {
    return this.http
      .get<any>(environment.api.url + 'brand')
      .pipe(
        catchError(() => {
          return throwError('El servidor no pudo procesar la solicitud.')
        }),
        map(data => data.map(
          (item: any) => new Brand(item.id, item.name, item.models)
        ))
      );
  }

  getModels(brandId: number): Observable<Model[]> {
    return this.http
      .get<any>(environment.api.url + 'model/' + brandId)
      .pipe(
        catchError(() => {
          return throwError('El servidor no pudo procesar la solicitud.')
        }),
        map(data => data.map(
          (item: any) => new Model(item.id, item.name, item.brand)
        ))
      );
  }

  getAll(): Observable<Bus[]> {
    return this.http
      .get<any>(environment.api.url + 'buses')
      .pipe(
        catchError(() => {
          return throwError('El servidor no pudo procesar la solicitud.')
        }),
        map(data => data.map(
          (item: any) => BusesService.makeBus(item)
        ))
      );
  }

  get(id: number): Observable<Bus> {
    return this.http
      .get<any>(environment.api.url + 'buses/' + id)
      .pipe(
        catchError(error => {
          switch (error.status) {
            case 404:
              return throwError('El colectivo no fue encontrado.');
            default:
              return throwError('El servidor no pudo procesar la solicitud.')
          }
        }),
        map(data => BusesService.makeBus(data))
      );
  }

  create(bus: any): Observable<any> {
    return this.http
      .post<any>(environment.api.url + 'buses', bus)
      .pipe(
        catchError(() => {
          return throwError('El colectivo no pudo ser creado.');
        })
      );
  }

  update(bus: any): Observable<any> {
    return this.http
      .put<any>(environment.api.url + 'buses', bus)
      .pipe(
        catchError(() => {
          return throwError('El colectivo no pudo ser actualizado.');
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete<any>(environment.api.url + 'buses/' + id)
      .pipe(
        catchError(() => {
          return throwError('No se pudo eliminar el colectivo.');
        })
      );
  }

}
