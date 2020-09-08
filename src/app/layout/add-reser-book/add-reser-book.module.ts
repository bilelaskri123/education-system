import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddReserBookRoutingModule } from "./add-reser-book-routing.module";
import { AddReserBookComponent } from "./add-reser-book.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddReserBookComponent],
  imports: [
    CommonModule,
    AddReserBookRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AddReserBookModule {}
