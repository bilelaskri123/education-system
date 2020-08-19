import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserProductComponent } from './reser-product.component';

describe('ReserProductComponent', () => {
  let component: ReserProductComponent;
  let fixture: ComponentFixture<ReserProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
