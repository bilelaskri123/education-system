import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashbordRoutingModule } from "./dashbord-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { MaterialModule } from "src/app/shared/material/material.module";

import { FullCalendarModule } from "@fullcalendar/angular"; // the main connector. must go first
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin
import interactionPlugin from "@fullcalendar/interaction";

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashbordRoutingModule,
    MaterialModule,
    FullCalendarModule,
  ],
})
export class DashbordModule {}
