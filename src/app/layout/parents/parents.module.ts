import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ParentsRoutingModule } from "./parents-routing.module";
import { ParentsComponent } from "./parents.component";

import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table"

@NgModule({
  declarations: [ParentsComponent],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
})
export class ParentsModule {}
