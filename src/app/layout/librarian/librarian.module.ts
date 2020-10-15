import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LibrarianRoutingModule } from "./librarian-routing.module";
import { LibrarianComponent } from "./librarian.component";
import { MaterialModule } from "../../shared/material/material.module";
import { Ng2SmartTableModule } from "ng2-smart-table"
@NgModule({
  declarations: [LibrarianComponent],
  imports: [
    CommonModule,
    LibrarianRoutingModule,
    MaterialModule,
    Ng2SmartTableModule
  ],
})
export class LibrarianModule {}
