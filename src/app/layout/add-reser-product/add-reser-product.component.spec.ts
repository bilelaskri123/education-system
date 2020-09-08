import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReserProductComponent } from './add-reser-product.component';

describe('AddReserProductComponent', () => {
  let component: AddReserProductComponent;
  let fixture: ComponentFixture<AddReserProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReserProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReserProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
