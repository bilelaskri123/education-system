import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddReserProductRoutingModule } from "./add-reser-product-routing.module";
import { AddReserProductComponent } from "./add-reser-product.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddReserProductComponent],
  imports: [
    CommonModule,
    AddReserProductRoutingModule,
    MaterialModule,
    FormsModule,
  ],
})
export class AddReserProductModule {}
