import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";
import { MaterialModule } from "../../shared/material/material.module";
import { HeaderComponent } from "../header/header.component";

@NgModule({
  declarations: [ProductsComponent, HeaderComponent],
  imports: [CommonModule, ProductsRoutingModule, MaterialModule],
})
export class ProductsModule {}
