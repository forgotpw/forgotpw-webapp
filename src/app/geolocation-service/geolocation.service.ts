
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {

  constructor(
    private http: HttpClient
    ) {  }

  getCountryCode() {

    const url = 'https://ipapi.co/country/'
    console.debug(`Initiating country code lookup to: ${url}`)

    return this.http.get(
      url, {responseType: 'text'})
      .pipe(
        timeout(3000),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Client side error occurred calling Geolocation API:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend error from Geolocation API, returned code ${error.status}, ` +
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
