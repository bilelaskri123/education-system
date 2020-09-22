import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddLibrarianRoutingModule } from "./add-librarian-routing.module";
import { AddLibrarianComponent } from "./add-librarian.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [AddLibrarianComponent],
  imports: [
    CommonModule,
    AddLibrarianRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AddLibrarianModule {}
