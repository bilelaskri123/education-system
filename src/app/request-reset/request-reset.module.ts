import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RequestResetRoutingModule } from "./request-reset-routing.module";
import { RequestResetComponent } from "./request-reset.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [RequestResetComponent],
  imports: [
    CommonModule,
    RequestResetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RequestResetModule {}
