import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderRoutingModule } from "./header-routing.module";
import { HeaderComponent } from "./header.component";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, HeaderRoutingModule, MaterialModule],
})
export class HeaderModule {}
