import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReserBookRoutingModule } from "./reser-book-routing.module";
import { ReserBookComponent } from "./reser-book.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  declarations: [ReserBookComponent],
  imports: [
    CommonModule,
    ReserBookRoutingModule,
    MaterialModule,
    Ng2SmartTableModule,
  ],
})
export class ReserBookModule {}
