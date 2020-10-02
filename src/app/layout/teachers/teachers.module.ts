import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TeachersRoutingModule } from "./teachers-routing.module";
import { TeachersComponent } from "./teachers.component";
import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [TeachersComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class TeachersModule {}
