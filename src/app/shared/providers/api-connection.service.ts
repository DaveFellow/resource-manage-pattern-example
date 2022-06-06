import { Injectable } from '@angular/core';
import { APIConnectionHandler } from '../interfaces/APIConnectionHandler';
import { RequestProcessor } from '../interfaces/RequestProcessor';
import { UserSession } from '../interfaces/resources/UserSession';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { RequestResponse } from '../types/Requests';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService implements APIConnectionHandler, RequestProcessor {
  readonly baseUrl: string = environment.apiUrl;

  private sessionData: UserSession = {
    name: '',
    email: '',
    token: ''
  };

  protected headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient) { }

  private buildUrl = (route: string): string => `${this.baseUrl}/${route}`;

  get<T>(route: string): Observable<RequestResponse<T>> {
    const url = this.buildUrl(route);
    const request: Observable<RequestResponse<T>> = this.http.get<RequestResponse<T>>(url, { headers: this.headers });
    return this.pipeRequest(request);
  }

  post<T>(route: string, body: Object): Observable<RequestResponse<T>> {
    const url = this.buildUrl(route);
    const request: Observable<RequestResponse<T>> = this.http.post<RequestResponse<T>>(url, body, { headers: this.headers });
    return this.pipeRequest(request);
  }

  put<T>(route: string, body: Object): Observable<RequestResponse<T>> {
    const url = this.buildUrl(route);
    const request: Observable<RequestResponse<T>> = this.http.put<RequestResponse<T>>(url, body, { headers: this.headers });
    return this.pipeRequest(request);
  }

  delete<T>(route: string): Observable<RequestResponse<T>> {
    const url = this.buildUrl(route);
    const request: Observable<RequestResponse<T>> = this.http.delete<RequestResponse<T>>(url, { headers: this.headers });
    return this.pipeRequest(request);
  }

  pipeRequest<T>(request: Observable<RequestResponse<T>>): Observable<RequestResponse<T>> {
    return request.pipe(
      map((response: RequestResponse<T>) => response),
      catchError((err, response) => {
        throw err;
      })
    );
  }

  getSession(): UserSession {
    return this.sessionData;
  }

  setSession(sessionData: UserSession): void {
    this.sessionData = sessionData;
    this.headers = this.headers.append('Bearer Token', sessionData.token || '');
  }

  clearSession(): void {
    this.setSession({});
    this.headers = this.headers.delete('Bearer Token');
  }
}
