import { TestBed } from '@angular/core/testing';

import { MainchartService } from './mainchart.service';

describe('MainchartService', () => {
  let service: MainchartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainchartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
