import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReserProductRoutingModule } from "./reser-product-routing.module";
import { ReserProductComponent } from "./reser-product.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  declarations: [ReserProductComponent],
  imports: [
    CommonModule,
    ReserProductRoutingModule,
    MaterialModule,
    Ng2SmartTableModule,
  ],
})
export class ReserProductModule {}
