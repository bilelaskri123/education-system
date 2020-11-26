import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAttendanceComponent } from './nav-attendance.component';

describe('NavAttendanceComponent', () => {
  let component: NavAttendanceComponent;
  let fixture: ComponentFixture<NavAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
