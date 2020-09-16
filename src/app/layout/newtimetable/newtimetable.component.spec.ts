import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtimetableComponent } from './newtimetable.component';

describe('NewtimetableComponent', () => {
  let component: NewtimetableComponent;
  let fixture: ComponentFixture<NewtimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
