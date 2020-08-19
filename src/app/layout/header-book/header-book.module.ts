import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderBookRoutingModule } from "./header-book-routing.module";
import { HeaderBookComponent } from "./header-book.component";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [HeaderBookComponent],
  imports: [CommonModule, HeaderBookRoutingModule, MaterialModule],
})
export class HeaderBookModule {}
