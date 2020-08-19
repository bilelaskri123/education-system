import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReserBookComponent } from './my-reser-book.component';

describe('MyReserBookComponent', () => {
  let component: MyReserBookComponent;
  let fixture: ComponentFixture<MyReserBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReserBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReserBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
