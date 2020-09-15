import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddSubjectRoutingModule } from "./add-subject-routing.module";
import { AddSubjectComponent } from "./add-subject.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddSubjectComponent],
  imports: [
    CommonModule,
    AddSubjectRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AddSubjectModule {}
