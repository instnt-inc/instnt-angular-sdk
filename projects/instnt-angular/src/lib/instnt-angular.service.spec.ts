import { TestBed } from '@angular/core/testing';

import { InstntAngularService } from './instnt-angular.service';

describe('InstntAngularService', () => {
  let service: InstntAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstntAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
