import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SecretStoreRequest } from './secret-store-request'
import { SecretRetrieveRequest } from './secret-retrieve-request'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordSecretsService {

  constructor(
    private http: HttpClient
    ) {  }

  storeSecret(secretStoreRequest: SecretStoreRequest) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    const url = environment.apiUrl + '/secrets'
    return this.http.put<SecretStoreRequest>(
      url,
      secretStoreRequest)
      .pipe(
        catchError(this.handleError)
      );

  }

  retrieveSecret(secretRetrieveRequest: SecretRetrieveRequest) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    const url = environment.apiUrl + '/secrets'
    return this.http.post<SecretRetrieveRequest>(
      url,
      secretRetrieveRequest)
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
        `body was: ${JSON.stringify(error.error)}`);
    }

    let msg = 'Error'
    try {
      if (error.error.message.message) {
        msg = JSON.stringify(error.error.message.message)
      } else {
        msg = JSON.stringify(error.error.message);
      }
    }
    catch (err) {
      console.error(`Error generating error message: ${err}`);
    }

    // return an observable with a user-facing error message
    return throwError({
      status: error.status,
      message: msg
    });
  };
}
