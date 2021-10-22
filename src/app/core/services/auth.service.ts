import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private jwt: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  get email(): string | null {
    return localStorage.getItem(environment.keys.email);
  }

  get token(): string | null {
    return localStorage.getItem(environment.keys.token);
  }

  isLogged(): boolean {
    return this.token !== null && !this.jwt.isTokenExpired(this.token);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(environment.api.url + 'login', { username: username, password: password }).pipe(
      catchError(error => {
        switch (error.status) {
          case 401:
            return throwError('Los datos ingresados no son válidos.');
          default:
            return throwError('El servidor no pudo procesar la solicitud.')
        }
      }),
      tap(response => {
        const payload = this.jwt.decodeToken(response.token);
        localStorage.setItem(environment.keys.token, response.token);
        localStorage.setItem(environment.keys.email, payload.username);
      })
    );
  }

  logout() {
    localStorage.removeItem(environment.keys.token);
    localStorage.removeItem(environment.keys.email);
    this.router.navigate(['auth', 'login']).then();
  }

}
