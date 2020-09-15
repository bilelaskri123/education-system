import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ResponseResetRoutingModule } from "./response-reset-routing.module";
import { ResponseResetComponent } from "./response-reset.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ResponseResetComponent],
  imports: [
    CommonModule,
    ResponseResetRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ResponseResetModule {}
