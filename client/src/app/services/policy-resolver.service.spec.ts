import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PolicyResolverService } from './policy-resolver.service';

describe('PolicyResolverService', () => {
  let service: PolicyResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    });
    service = TestBed.inject(PolicyResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
