import { TestBed } from '@angular/core/testing';

import { ClassroomsResourceService } from './classrooms-resource.service';

describe('ClassroomsResourceService', () => {
  let service: ClassroomsResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassroomsResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
