import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ParentsRoutingModule } from "./parents-routing.module";
import { ParentsComponent } from "./parents.component";

import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ParentsComponent],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ParentsModule {}
