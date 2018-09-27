import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CodeGenerateRequest } from './code-generate-request'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CodesService {
  apiUrl = 'https://api-dev.forgotpw.com/v1'

  constructor(
    private http: HttpClient
    ) {  }

  requestCode(codeGenerateRequest: CodeGenerateRequest) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    const url = this.apiUrl + '/codes'
    return this.http.post<CodeGenerateRequest>(
      url,
      codeGenerateRequest)
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
    return throwError(
      'Error occurred invoking codes service.');
  };
}
