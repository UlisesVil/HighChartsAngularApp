import { TestBed } from '@angular/core/testing';

import { BdPwaPieService } from './bd-pwa-pie.service';

describe('BdPwaPieService', () => {
  let service: BdPwaPieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdPwaPieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
