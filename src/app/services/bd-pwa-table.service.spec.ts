import { TestBed } from '@angular/core/testing';

import { BdPwaTableService } from './bd-pwa-table.service';

describe('BdPwaTableService', () => {
  let service: BdPwaTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdPwaTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
