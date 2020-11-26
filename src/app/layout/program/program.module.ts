import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProgramRoutingModule } from "./program-routing.module";
import { ProgramComponent } from "./program.component";
import { MaterialModule } from "../../shared/material/material.module";
import { NavProgramComponent } from './nav-program/nav-program.component';
import { ProgramDetailComponent } from './program-detail/program-detail.component';
import { ProgramItemComponent } from './program-item/program-item.component';

@NgModule({
  declarations: [ProgramComponent, NavProgramComponent, ProgramDetailComponent, ProgramItemComponent],
  imports: [CommonModule, ProgramRoutingModule, MaterialModule],
})
export class ProgramModule {}
