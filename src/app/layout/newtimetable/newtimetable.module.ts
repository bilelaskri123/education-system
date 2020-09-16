import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewtimetableRoutingModule } from "./newtimetable-routing.module";
import { NewtimetableComponent } from "./newtimetable.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [NewtimetableComponent],
  imports: [
    CommonModule,
    NewtimetableRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class NewtimetableModule {}
