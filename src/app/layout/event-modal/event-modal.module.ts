import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EventModalRoutingModule } from "./event-modal-routing.module";
import { EventModalComponent } from "./event-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/shared/material/material.module";

@NgModule({
  declarations: [EventModalComponent],
  imports: [
    CommonModule,
    EventModalRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
})
export class EventModalModule {}
