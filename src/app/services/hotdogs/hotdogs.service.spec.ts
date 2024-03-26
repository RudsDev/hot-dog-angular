import { TestBed } from '@angular/core/testing';

import { HotdogsService } from './hotdogs.service';

describe('HotdogsService', () => {
  let service: HotdogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotdogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
