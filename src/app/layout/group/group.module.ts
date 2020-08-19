import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GroupRoutingModule } from "./group-routing.module";
import { GroupComponent } from "./group.component";
import { MaterialModule } from "../../shared/material/material.module";

@NgModule({
  declarations: [GroupComponent],
  imports: [CommonModule, GroupRoutingModule, MaterialModule],
})
export class GroupModule {}
