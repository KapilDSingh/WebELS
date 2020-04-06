import { TestBed } from '@angular/core/testing';

import { LmpService } from './lmp.service';

describe('LmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LmpService = TestBed.get(LmpService);
    expect(service).toBeTruthy();
  });
});
