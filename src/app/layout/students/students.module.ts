import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { StudentsRoutingModule } from "./students-routing.module";
import { StudentComponent } from "./students.component";
import { MaterialModule } from "../../shared/material/material.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [StudentComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class StudentsModule {}
