import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeBookComponent } from './demande-book.component';

describe('DemandeBookComponent', () => {
  let component: DemandeBookComponent;
  let fixture: ComponentFixture<DemandeBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
