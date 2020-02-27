import { TestBed } from '@angular/core/testing';

import { MeterDataService } from './meter-data.service';

describe('MeterDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeterDataService = TestBed.get(MeterDataService);
    expect(service).toBeTruthy();
  });
});
