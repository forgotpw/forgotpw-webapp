import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SecretStoreAridRequest } from './secret-store-request'
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordSecretsService {

  constructor(
    private http: HttpClient
    ) {  }

  storeSecretViaArid(arid: string, secretStoreAridRequest: SecretStoreAridRequest) {
    const url = environment.apiUrl + '/authorizedRequests/' + arid;
    console.log(url);
    return this.http.put<SecretStoreAridRequest>(
      url,
      { secret: secretStoreAridRequest })
      .pipe(
        catchError(this.handleError)
      );
  }

  retrieveAuthorizedRequest(arid: string) {
    const url = `${environment.apiUrl}/authorizedRequests/${arid}`;
    return this.http.get<any>(
      url)
      .pipe(
        catchError(this.handleError)
      );
  }

  retrieveAuthorizedRequestSecret(arid: string) {
    const url = `${environment.apiUrl}/authorizedRequests/${arid}/secret`;
    return this.http.get<any>(
      url)
      .pipe(
        catchError(this.handleError)
      );
  }

  autogenerateSecret(languageCode: string) {
    const url = environment.apiUrl + '/secrets/autogen'
    return this.http.post<any>(
      url,
      { languageCode })
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
