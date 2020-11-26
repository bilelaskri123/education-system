import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeProductComponent } from './demande-product.component';

describe('DemandeProductComponent', () => {
  let component: DemandeProductComponent;
  let fixture: ComponentFixture<DemandeProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemandeProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemandeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
