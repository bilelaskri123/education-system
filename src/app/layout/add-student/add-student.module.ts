import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddStudentRoutingModule } from "./add-student-routing.module";
import { AddStudentComponent } from "./add-student.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddStudentComponent],
  imports: [
    CommonModule,
    AddStudentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AddStudentModule {}
