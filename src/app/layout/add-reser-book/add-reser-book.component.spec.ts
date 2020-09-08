import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReserBookComponent } from './add-reser-book.component';

describe('AddReserBookComponent', () => {
  let component: AddReserBookComponent;
  let fixture: ComponentFixture<AddReserBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReserBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReserBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
