import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddSectionRoutingModule } from "./add-section-routing.module";
import { AddSectionComponent } from "./add-section.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddSectionComponent],
  imports: [
    CommonModule,
    AddSectionRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AddSectionModule {}
