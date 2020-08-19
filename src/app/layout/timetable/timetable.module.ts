import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TimetableRoutingModule } from "./timetable-routing.module";
import { TimetableComponent } from "./timetable.component";
import { MaterialModule } from "../../shared/material/material.module";

@NgModule({
  declarations: [TimetableComponent],
  imports: [CommonModule, TimetableRoutingModule, MaterialModule],
})
export class TimetableModule {}
