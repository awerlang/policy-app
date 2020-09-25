import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

const host = ''

type PathComponent = string | number
type Path = [string, ...PathComponent[]]

function mountPath(path: Path): string | Error {
  const invalid = path.some(value => ['', NaN, null, undefined].includes(value))
  if (invalid) {
    return new Error('Path contains invalid component')
  }
  const pathString = path.join('/')
  return `${host}/api/${pathString}`;
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
      return throwError({ message: 'Something bad happened; please try again later.' });
    } else if (error.status === 0) {
      return throwError({ message: 'Could not reach network. No internet?' });
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      return throwError({ message: error.error.message });
    }
  }

  private request<T, U = unknown>(method: string, path: Path, body?: U): Observable<T> {
    const pathString = mountPath(path)
    if (pathString instanceof Error) {
      return throwError(pathString)
    }
    return this.http.request<T>(method, pathString, { body })
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
