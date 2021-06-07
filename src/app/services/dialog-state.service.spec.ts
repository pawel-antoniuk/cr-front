import { TestBed } from '@angular/core/testing';

import { DialogStateService } from './dialog-state.service';

describe('DialogStateService', () => {
  let service: DialogStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
