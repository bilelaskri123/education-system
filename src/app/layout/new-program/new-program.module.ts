import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewProgramRoutingModule } from "./new-program-routing.module";
import { NewProgramComponent } from "./new-program.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [NewProgramComponent],
  imports: [
    CommonModule,
    NewProgramRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class NewProgramModule {}
