import { TestBed } from '@angular/core/testing';

import { ParentAreaService } from './parent-area.service';

describe('ParentAreaService', () => {
  let service: ParentAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParentAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
