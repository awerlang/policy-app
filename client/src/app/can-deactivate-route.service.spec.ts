import { TestBed } from '@angular/core/testing';

import { CanDeactivateRouteService } from './can-deactivate-route.service';

describe('CanDeactivateRouteService', () => {
  let service: CanDeactivateRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanDeactivateRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
