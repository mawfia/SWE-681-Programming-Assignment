import { TestBed } from '@angular/core/testing';

import { BicycleDetailResolverService } from './bicycle-detail-resolver.service';

describe('BicycleDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BicycleDetailResolverService = TestBed.get(BicycleDetailResolverService);
    expect(service).toBeTruthy();
  });
});
