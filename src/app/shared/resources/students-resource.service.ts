import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIConnectionResponseBody } from '../interfaces/APIConnectionResponse';
import { Student } from '../interfaces/resources/Student';
import { RequestResponse } from '../types/Requests';
import { ResourceId } from '../types/Resources';
import { BaseResource } from './BaseResource';

@Injectable({
  providedIn: 'root'
})
export class StudentsResourceService extends BaseResource<Student> {

  constructor(override http: HttpClient) {
    super(http);
    this.setName('students');
    this.status.setIdle('inscribe');
  }

  inscribe(studentId: ResourceId, classroomId: ResourceId): Observable<APIConnectionResponseBody> {
    const url: string = `${this.getName()}/inscribe`;

    const body = { studentId, classroomId };

    const request: Observable<RequestResponse<Object>> = this.http.post<RequestResponse<Object>>(url, body);
  
    return this.pipeRequest(request, 'inscribe').pipe(
      map(response => (<HttpResponse<APIConnectionResponseBody>>response).body as APIConnectionResponseBody)
    );
  }
}
