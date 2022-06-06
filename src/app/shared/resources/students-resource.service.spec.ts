import { TestBed } from '@angular/core/testing';

import { StudentsResourceService } from './students-resource.service';

describe('StudentsResourceService', () => {
  let service: StudentsResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
