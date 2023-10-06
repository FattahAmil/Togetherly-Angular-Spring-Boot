import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Response } from '../model/Response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private url = 'http://127.0.0.1:8082/authentication';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: object): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, user);
  }

  login(user: object): Observable<any> {
    return this.http.post<any>(`${this.url}/login`, user).pipe(
      tap(response => {
        const data = response as Response;
        
        if (response.body.access_token!==undefined) {
         sessionStorage.setItem('auth_token', data.body.access_token);
        }

      }),
      catchError(error => {
        // Handle login error here
        return of(error);
      })
    );
  }

  logout() {
    // Clear token from sessionStorage
    sessionStorage.removeItem('auth_token');

    // Redirect to login page
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    
    return sessionStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
