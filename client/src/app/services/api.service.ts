import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'

import { environment } from 'src/environments/environment';

// FIXME: url for development
const host = environment.production ? '' : 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    // TODO: handle errors
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);

      // Return an observable with a user-facing error message.
      return throwError('Something bad happened; please try again later.');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      return throwError(error.error);
    }
  }

  private request<T>(method: string, path: string, body?: T) {
    return this.http.request(method, `${host}/${path}`, { body })
      .pipe(catchError(this.handleError));
  }

  post<T>(path: string, body: T) {
    return this.request('POST', path, body);
  }
}
