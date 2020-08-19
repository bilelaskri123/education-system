import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyReserBookRoutingModule } from "./my-reser-book-routing.module";
import { MaterialModule } from "src/app/shared/material/material.module";
import { MyReserBookComponent } from "./my-reser-book.component";

@NgModule({
  declarations: [MyReserBookComponent],
  imports: [CommonModule, MyReserBookRoutingModule, MaterialModule],
})
export class MyReserBookModule {}
