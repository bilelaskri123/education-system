import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AttendanceRoutingModule } from "./attendance-routing.module";
import { AttendanceComponent } from "./attendance.component";
import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { AttendanceItemComponent } from './attendance-item/attendance-item.component';
import { NavAttendanceComponent } from './nav-attendance/nav-attendance.component';

@NgModule({
  declarations: [AttendanceComponent, AttendanceDetailComponent, AttendanceItemComponent, NavAttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AttendanceModule {}
