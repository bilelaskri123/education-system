import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAttandanceComponent } from './new-attandance.component';

describe('NewAttandanceComponent', () => {
  let component: NewAttandanceComponent;
  let fixture: ComponentFixture<NewAttandanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAttandanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAttandanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
