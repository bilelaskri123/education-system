import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AccountantComponent } from "./accountant.component";

describe("ButtonsComponent", () => {
  let component: AccountantComponent;
  let fixture: ComponentFixture<AccountantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
