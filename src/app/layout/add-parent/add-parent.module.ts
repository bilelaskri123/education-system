import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddParentRoutingModule } from "./add-parent-routing.module";
import { AddParentComponent } from "./add-parent.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddParentComponent],
  imports: [
    CommonModule,
    AddParentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AddParentModule {}
