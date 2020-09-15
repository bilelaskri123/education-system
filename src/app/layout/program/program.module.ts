import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProgramRoutingModule } from "./program-routing.module";
import { ProgramComponent } from "./program.component";
import { MaterialModule } from "../../shared/material/material.module";

@NgModule({
  declarations: [ProgramComponent],
  imports: [CommonModule, ProgramRoutingModule, MaterialModule],
})
export class ProgramModule {}
