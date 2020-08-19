import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReserProductComponent } from './my-reser-product.component';

describe('MyReserProductComponent', () => {
  let component: MyReserProductComponent;
  let fixture: ComponentFixture<MyReserProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyReserProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyReserProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
