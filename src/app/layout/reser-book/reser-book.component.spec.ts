import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserBookComponent } from './reser-book.component';

describe('ReserBookComponent', () => {
  let component: ReserBookComponent;
  let fixture: ComponentFixture<ReserBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
