import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SecretStoreRequest, SecretStoreAridRequest } from './secret-store-request'
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

  storeSecret(secretStoreRequest: SecretStoreRequest, verificationCode: string, countryCode: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-FPW-VerificationCode': `${verificationCode}`,
        'X-FPW-CountryCode': `${countryCode}`
      })
    };

    const url = environment.apiUrl + '/secrets'
    console.log(url)
    return this.http.put<SecretStoreRequest>(
      url,
      secretStoreRequest,
      httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  storeSecretViaArid(arid: string, secretStoreAridRequest: SecretStoreAridRequest) {
    const url = environment.apiUrl + '/authorizedRequests'
    console.log(url)
    return this.http.put<SecretStoreAridRequest>(
      url,
      secretStoreAridRequest)
      .pipe(
        catchError(this.handleError)
      );
  }

  retrieveSecret(secretRetrieveRequest: SecretRetrieveRequest, countryCode: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'X-FPW-CountryCode': `${countryCode}`
      })
    };

    const url = environment.apiUrl + '/secrets'
    return this.http.post<SecretRetrieveRequest>(
      url,
      secretRetrieveRequest,
      httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  retrieveAuthorizedRequest(arid: string) {
    const url = environment.apiUrl + '/authorizedRequests/' + arid;
    return this.http.get<SecretRetrieveRequest>(
      url)
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
