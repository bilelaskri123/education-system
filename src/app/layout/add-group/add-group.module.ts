import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddGroupRoutingModule } from "./add-group-routing.module";
import { AddGroupComponent } from "./add-group.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddGroupComponent],
  imports: [CommonModule, AddGroupRoutingModule, MaterialModule, FormsModule],
})
export class AddGroupModule {}
