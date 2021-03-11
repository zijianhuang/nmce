import { TestBed } from '@angular/core/testing';

import { NmceService } from './nmce.service';

describe('NmceService', () => {
  let service: NmceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NmceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
