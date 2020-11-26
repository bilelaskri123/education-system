import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavProgramComponent } from './nav-program.component';

describe('NavProgramComponent', () => {
  let component: NavProgramComponent;
  let fixture: ComponentFixture<NavProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
