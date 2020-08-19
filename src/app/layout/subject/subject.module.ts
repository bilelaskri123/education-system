import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SubjectRoutingModule } from "./subject-routing.module";
import { SubjectComponent } from "./subject.component";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [SubjectComponent],
  imports: [CommonModule, SubjectRoutingModule, MaterialModule],
})
export class SubjectModule {}
