import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GroupRoutingModule } from "./group-routing.module";
import { GroupComponent } from "./group.component";
import { MaterialModule } from "../../shared/material/material.module";
import { NavGroupComponent } from './nav-group/nav-group.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupItemComponent } from './group-item/group-item.component';

@NgModule({
  declarations: [GroupComponent, NavGroupComponent, GroupDetailComponent, GroupItemComponent],
  imports: [CommonModule, GroupRoutingModule, MaterialModule],
})
export class GroupModule {}
