import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReserBookRoutingModule } from "./reser-book-routing.module";
import { ReserBookComponent } from "./reser-book.component";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [ReserBookComponent],
  imports: [CommonModule, ReserBookRoutingModule, MaterialModule],
})
export class ReserBookModule {}
