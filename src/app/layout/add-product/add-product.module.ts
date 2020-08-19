import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddProductRoutingModule } from "./add-product-routing.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { AddProductComponent } from "./add-product.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AddProductModule {}
