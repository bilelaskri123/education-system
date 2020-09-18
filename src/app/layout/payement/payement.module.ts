import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PayementRoutingModule } from "./payement-routing.module";
import { PayementComponent } from "./payement.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [PayementComponent],
  imports: [
    CommonModule,
    PayementRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class PayementModule {}
