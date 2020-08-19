import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BookRoutingModule } from "./book-routing.module";
import { BookComponent } from "./book.component";
import { MaterialModule } from "../../shared/material/material.module";
import { HeaderBookComponent } from "../header-book/header-book.component";

@NgModule({
  declarations: [BookComponent, HeaderBookComponent],
  imports: [CommonModule, BookRoutingModule, MaterialModule],
})
export class BookModule {}
