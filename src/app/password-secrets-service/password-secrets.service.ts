import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PasswordHintStoreRequest } from './password-hint-store-request'
import { PasswordHintRetrieveRequest } from './password-hint-retrieve-request'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PasswordSecretsService {
  apiUrl = 'https://api-dev.forgotpw.com/v1'

  constructor(
    private http: HttpClient
    ) {  }

  storePasswordHint(pwhintStoreRequest: PasswordHintStoreRequest) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    const url = this.apiUrl + '/secrets'
    return this.http.put<PasswordHintStoreRequest>(
      url,
      pwhintStoreRequest)
      .pipe(
        catchError(this.handleError)
      );

  }

  retrievePasswordHint(pwhintRetrieveRequest: PasswordHintRetrieveRequest) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    const url = this.apiUrl + '/secrets'
    return this.http.post<PasswordHintRetrieveRequest>(
      url,
      pwhintRetrieveRequest)
      .pipe(
        catchError(this.handleError)
      );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side error occurred calling API:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend error from API, returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    if (error.status == 401) {
      return throwError({
        status: 401,
        message: 'Confirmation code is invalid or expired'
      });
  
    }
    return throwError({
      status: 500,
      message: 'Error occurred invoking password secrets service.' 
    });
  };
}
