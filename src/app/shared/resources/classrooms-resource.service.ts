import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIConnectionResponseBody } from '../interfaces/APIConnectionResponse';
import { Classroom } from '../interfaces/resources/Classroom';
import { ApiConnectionService } from '../providers/api-connection.service';
import { RequestResponse } from '../types/Requests';
import { ResourceId } from '../types/Resources';
import { BaseResource } from './BaseResource';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsResourceService extends BaseResource<Classroom> {

  constructor(override connection: ApiConnectionService) {
    super(connection);
    this.setName('classrooms');
  }
}