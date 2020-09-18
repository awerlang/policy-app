import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

const host = ''

type PathComponent = string | number
type Path = [string, ...PathComponent[]]

function mountPath(path: Path): string {
  path.forEach((value, index) => {
    switch (value) {
      case '':
      case null:
      case undefined:
        throw new Error(`Path component #${index} is empty`)
    }
  })
  return path.join('/')
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<never> {
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

  private request<T, U = unknown>(method: string, path: Path, body?: U): Observable<T> {
    const pathString = mountPath(path)
    return this.http.request<T>(method, `${host}/api/${pathString}`, { body })
      .pipe(catchError(this.handleError));
  }

  get<T>(...path: Path): Observable<T> {
    return this.request<T>('GET', path);
  }

  post<T, U>(path: string, body: U): Observable<T>
  post<T, U>(path1: string, path2: PathComponent, body: U): Observable<T>
  post<T, U>(path1: string, path2: PathComponent, path3: PathComponent, body: U): Observable<T>
  post<T, U, S extends PathComponent[]>(...args: [...S, U]): Observable<T> {
    const body = args.pop()
    const path = args.slice() as Path
    return this.request<T>('POST', path, body);
  }

  delete<T>(...path: Path): Observable<T> {
    return this.request<T>('DELETE', path);
  }
}
