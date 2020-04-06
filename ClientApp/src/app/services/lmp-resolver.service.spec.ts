import { TestBed } from '@angular/core/testing';

import { LmpResolverService } from './lmp-resolver.service';

describe('LmpResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LmpResolverService = TestBed.get(LmpResolverService);
    expect(service).toBeTruthy();
  });
});
