import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { DemandeBookRoutingModule } from "./demande-book-routing.module";
import { DemandeBookComponent } from "./demande-book.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [DemandeBookComponent],
  imports: [
    CommonModule,
    DemandeBookRoutingModule,
    Ng2SmartTableModule,
    MaterialModule,
  ],
})
export class DemandeBookModule {}
