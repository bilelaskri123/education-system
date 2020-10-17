import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { MaterialModule } from "../../shared/material/material.module";
import { HeaderComponent } from "../header/header.component";
import { ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table"

@NgModule({
  declarations: [ProductsComponent, HeaderComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
})
export class ProductsModule {}
