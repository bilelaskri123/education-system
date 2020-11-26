import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceItemComponent } from './attendance-item.component';

describe('AttendanceItemComponent', () => {
  let component: AttendanceItemComponent;
  let fixture: ComponentFixture<AttendanceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
