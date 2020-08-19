import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBookComponent } from './header-book.component';

describe('HeaderBookComponent', () => {
  let component: HeaderBookComponent;
  let fixture: ComponentFixture<HeaderBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
