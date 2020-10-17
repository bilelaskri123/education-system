import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BookRoutingModule } from "./book-routing.module";
import { BookComponent } from "./book.component";
import { MaterialModule } from "../../shared/material/material.module";
import { HeaderBookComponent } from "../header-book/header-book.component";
import { ReactiveFormsModule } from "@angular/forms";
import { Ng2SmartTableModule } from "ng2-smart-table"

@NgModule({
  declarations: [BookComponent, HeaderBookComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    Ng2SmartTableModule
  ],
})
export class BookModule {}
