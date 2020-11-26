import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DemandeProductRoutingModule } from "./demande-product-routing.module";
import { DemandeBookComponent } from "../demande-book/demande-book.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { MaterialModule } from "src/app/shared/material/material.module";
import { DemandeProductComponent } from "./demande-product.component";

@NgModule({
  declarations: [DemandeProductComponent],
  imports: [
    CommonModule,
    DemandeProductRoutingModule,
    Ng2SmartTableModule,
    MaterialModule,
  ],
})
export class DemandeProductModule {}
