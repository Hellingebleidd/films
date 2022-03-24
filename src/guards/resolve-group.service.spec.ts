import { TestBed } from '@angular/core/testing';

import { ResolveGroupService } from './resolve-group.service';

describe('ResolveGroupService', () => {
  let service: ResolveGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolveGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
