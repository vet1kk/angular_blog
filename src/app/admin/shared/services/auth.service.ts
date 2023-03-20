import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from '../../../shared/interfaces';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({providedIn: 'root'})

export class AuthService {
  auth: boolean = false;
  public errors$: Subject<string> = new Subject<string>()


  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') ?? '')
    if (new Date() > expDate) {
      this.logout()
      return null
    }

    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<FbAuthResponse | null> {
    user.returnSecureToken = true
    return (this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user) as Observable<FbAuthResponse>)
      .pipe(
        tap(resp => AuthService.setToken(resp)),
        catchError(resp => this.handleError(resp))
      )
  }

  logout() {
    AuthService.setToken(null)

  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(resp: HttpErrorResponse): Observable<never> {
    const {message} = resp.error.error;
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        this.errors$.next('Такого email нет')
        break
      case 'INVALID_EMAIL':
        this.errors$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.errors$.next('Неверный пароль')
        break

    }
    return throwError(() => resp)
  }

  private static setToken(response: FbAuthResponse | null) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }

  }

}
