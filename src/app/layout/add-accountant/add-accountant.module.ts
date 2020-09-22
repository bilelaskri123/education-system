import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddAccountantRoutingModule } from "./add-accountant-routing.module";
import { AddAccountantComponent } from "./add-accountant.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [AddAccountantComponent],
  imports: [
    CommonModule,
    AddAccountantRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AddAccountantModule {}
