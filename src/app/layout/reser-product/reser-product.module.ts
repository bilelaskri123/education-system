import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReserProductRoutingModule } from "./reser-product-routing.module";
import { ReserProductComponent } from "./reser-product.component";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [ReserProductComponent],
  imports: [CommonModule, ReserProductRoutingModule, MaterialModule],
})
export class ReserProductModule {}
