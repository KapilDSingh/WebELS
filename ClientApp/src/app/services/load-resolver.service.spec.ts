import { TestBed } from '@angular/core/testing';

import { LoadResolverService } from './load-resolver.service';

describe('LoadResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadResolverService = TestBed.get(LoadResolverService);
    expect(service).toBeTruthy();
  });
});
