import { TestBed } from '@angular/core/testing';

import { SelectingPreloadingService } from './selecting-preloading.service';

describe('SelectingPreloadingService', () => {
  let service: SelectingPreloadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectingPreloadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
