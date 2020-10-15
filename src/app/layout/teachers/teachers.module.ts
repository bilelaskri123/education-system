import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeachersRoutingModule } from "./teachers-routing.module";
import { TeachersComponent } from "./teachers.component";
import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table"

@NgModule({
  declarations: [TeachersComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
})
export class TeachersModule {}
