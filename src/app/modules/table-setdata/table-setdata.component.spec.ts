import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSetdataComponent } from './table-setdata.component';

describe('TableSetdataComponent', () => {
  let component: TableSetdataComponent;
  let fixture: ComponentFixture<TableSetdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSetdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSetdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
