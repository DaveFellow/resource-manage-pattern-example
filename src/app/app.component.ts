import { Component, OnInit } from '@angular/core';
import { Classroom } from './shared/interfaces/resources/Classroom';
import { Student } from './shared/interfaces/resources/Student';

import { ClassroomsResourceService } from './shared/resources/classrooms-resource.service';
import { StudentsResourceService } from './shared/resources/students-resource.service';
import { ResourceId } from './shared/types/Resources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sample-angular-project';

  readonly classroomList$ = this.classroomsResource.list();

  readonly classroomDetails$ = this.classroomsResource.details(8);

  constructor(
    public classroomsResource: ClassroomsResourceService,
    public studentsResource: StudentsResourceService
  ) {}

  ngOnInit(): void {
    // CLASSROOM LIST
    this.classroomsResource.list().subscribe();    

    // CLASSROOM DETAILS
    this.classroomsResource.details(9).subscribe();    

    // CLASSROOM CREATE
    const createClassroomBody: Partial<Classroom> = {
      label: '1A',
      capacity: 60,
    };
    this.classroomsResource.create(createClassroomBody).subscribe();    

    // CLASSROOM UPDATE
    const updateClassroomBody: Partial<Classroom> = { label: '2C' };
    this.classroomsResource.update(2, updateClassroomBody).subscribe();

    // CLASSROOM DELETE
    this.classroomsResource.delete(76).subscribe();


    // STUDENT LIST
    this.studentsResource.list().subscribe();

    // STUDENT DETAILS
    this.studentsResource.details(89).subscribe();
    
    // STUDENT CREATE
    const createStudentBody: Partial<Student> = {
      grade: 8,
      userId: 768,
      classroomId: 5
    };
    this.studentsResource.create(createStudentBody).subscribe();

    // STUDENT UPDATE
    const updateStudentBody: Partial<Student> = { grade: 11 };
    this.studentsResource.update(7, updateStudentBody).subscribe();

    // STUDENT DELETE
    this.studentsResource.delete(452).subscribe();

    // CLASSROOM INSCRIBE
    this.studentsResource.inscribe(89, 4).subscribe();
  }
}
