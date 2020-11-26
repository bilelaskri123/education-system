import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEvaluationComponent } from './nav-evaluation.component';

describe('NavEvaluationComponent', () => {
  let component: NavEvaluationComponent;
  let fixture: ComponentFixture<NavEvaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
