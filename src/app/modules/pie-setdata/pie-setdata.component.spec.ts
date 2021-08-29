import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieSetdataComponent } from './pie-setdata.component';

describe('PieSetdataComponent', () => {
  let component: PieSetdataComponent;
  let fixture: ComponentFixture<PieSetdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieSetdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieSetdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
