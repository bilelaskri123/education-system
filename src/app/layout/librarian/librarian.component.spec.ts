import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianComponent } from './librarian.component';

describe('CarouselComponent', () => {
  let component: LibrarianComponent;
  let fixture: ComponentFixture<LibrarianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibrarianComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
