import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountantRoutingModule } from "./accountant-routing.module";
import { AccountantComponent } from "./accountant.component";
import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AccountantComponent],
  imports: [
    CommonModule,
    AccountantRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AccountantModule {}
