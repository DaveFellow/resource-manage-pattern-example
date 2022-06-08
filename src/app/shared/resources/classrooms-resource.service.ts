import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom } from '../interfaces/resources/Classroom';
import { BaseResource } from './BaseResource';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsResourceService extends BaseResource<Classroom> {

  constructor(override http: HttpClient) {
    super(http);
    this.setName('classrooms');
  }
}