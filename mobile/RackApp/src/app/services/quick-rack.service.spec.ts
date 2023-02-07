import { TestBed } from '@angular/core/testing';

import { QuickRackService } from './quick-rack.service';

describe('QuickRackService', () => {
  let service: QuickRackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickRackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
