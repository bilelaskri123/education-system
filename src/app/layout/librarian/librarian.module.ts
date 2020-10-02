import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LibrarianRoutingModule } from "./librarian-routing.module";
import { LibrarianComponent } from "./librarian.component";
import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LibrarianComponent],
  imports: [
    CommonModule,
    LibrarianRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class LibrarianModule {}
