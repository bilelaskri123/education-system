import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddTeacherComponent } from "./add-teacher.component";
import { AddTeacherRoutingModule } from "./add-teacher-routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [AddTeacherComponent],
  imports: [
    CommonModule,
    AddTeacherRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AddTeacherModule {}
