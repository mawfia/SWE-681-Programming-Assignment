import { TestBed } from '@angular/core/testing';

import { BicycleService } from './bicycle.service';

describe('BicycleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BicycleService = TestBed.get(BicycleService);
    expect(service).toBeTruthy();
  });
});
