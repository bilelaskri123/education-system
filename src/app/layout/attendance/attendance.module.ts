import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AttendanceRoutingModule } from "./attendance-routing.module";
import { AttendanceComponent } from "./attendance.component";
import { MaterialModule } from "../../shared/material/material.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AttendanceComponent],
  imports: [CommonModule, AttendanceRoutingModule, MaterialModule, FormsModule],
})
export class AttendanceModule {}
