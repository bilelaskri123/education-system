import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyReserProductRoutingModule } from "./my-reser-product-routing.module";
import { MyReserProductComponent } from "./my-reser-product.component";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [MyReserProductComponent],
  imports: [CommonModule, MyReserProductRoutingModule, MaterialModule],
})
export class MyReserProductModule {}
