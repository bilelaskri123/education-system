import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountantRoutingModule } from "./accountant-routing.module";
import { AccountantComponent } from "./accountant.component";
import { MaterialModule } from "../../shared/material/material.module";
import { Ng2SmartTableModule } from "ng2-smart-table"

@NgModule({
  declarations: [AccountantComponent],
  imports: [
    CommonModule,
    AccountantRoutingModule,
    MaterialModule,
    Ng2SmartTableModule
  ],
})
export class AccountantModule {}
