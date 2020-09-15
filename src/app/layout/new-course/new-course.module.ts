import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewCourseRoutingModule } from "./new-course-routing.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NewCourseComponent } from "./new-course.component";

@NgModule({
  declarations: [NewCourseComponent],
  imports: [
    CommonModule,
    NewCourseRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class NewCourseModule {}
