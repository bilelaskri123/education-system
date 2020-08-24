import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddCourseRoutingModule } from "./add-course-routing.module";
import { AddCourseComponent } from "./add-course.component";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [AddCourseComponent],
  imports: [CommonModule, AddCourseRoutingModule, MaterialModule],
})
export class AddCourseModule {}
