import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DashbordRoutingModule } from "./dashbord-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, DashbordRoutingModule, MaterialModule],
})
export class DashbordModule {}
