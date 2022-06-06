import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIConnectionResponseBody } from '../interfaces/APIConnectionResponse';
import { Student } from '../interfaces/resources/Student';
import { ApiConnectionService } from '../providers/api-connection.service';
import { RequestResponse } from '../types/Requests';
import { ResourceId } from '../types/Resources';
import { BaseResource } from './BaseResource';

@Injectable({
  providedIn: 'root'
})
export class StudentsResourceService extends BaseResource<Student> {

  constructor(override connection: ApiConnectionService) {
    super(connection);
    this.setName('students');
    this.status.setIdle('inscribe');
  }

  inscribe(studentId: ResourceId, classroomId: ResourceId): Observable<APIConnectionResponseBody> {
    const url: string = `${this.getName()}/inscribe`;

    const body = { studentId, classroomId };

    const request: Observable<RequestResponse<Object>> = this.connection.post(url, body);
  
    return this.pipeRequest(request, 'inscribe').pipe(
      map(response => (<HttpResponse<APIConnectionResponseBody>>response).body as APIConnectionResponseBody)
    );
  }
}
