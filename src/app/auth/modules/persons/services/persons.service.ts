import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Person } from '../../../../core/domain/person';
import { environment } from '../../../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PersonService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Person[]> {
    return this.http
      .get<any>(environment.api.url + 'persons')
      .pipe(
        catchError(() => {
          return throwError('El servidor no pudo procesar la solicitud.')
        }),
        map(data => data.map(
          (item: any) => new Person(item.id, item.firstName, item.lastName, item.age)
        ))
      );
  }

  get(id: number): Observable<Person> {
    return this.http
      .get<any>(environment.api.url + 'persons/' + id)
      .pipe(
        catchError(error => {
          switch (error.status) {
            case 404:
              return throwError('La persona no fue encontrada. ');
            default:
              return throwError('El servidor no pudo procesar la solicitud.')
          }
        }),
        map(data => new Person(data.id, data.firstName, data.lastName, data.age))
      );
  }

  create(person: any): Observable<any> {
    return this.http
      .post<any>(environment.api.url + 'persons', person)
      .pipe(
        catchError(() => {
          return throwError('La persona no pudo ser creada.');
        })
      );
  }

  update(person: any): Observable<any> {
    return this.http
      .put<any>(environment.api.url + 'persons', person)
      .pipe(
        catchError(() => {
          return throwError('La persona no pudo ser actualizada.');
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http
      .delete<any>(environment.api.url + 'persons/' + id)
      .pipe(
        catchError(() => {
          return throwError('No se pudo eliminar la persona.');
        })
      );
  }

}
