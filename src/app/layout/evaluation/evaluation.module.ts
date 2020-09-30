import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EvaluationRoutingModule } from "./evaluation-routing.module";
import { EvaluationComponent } from "./evaluation.component";
import { MaterialModule } from "../../shared/material/material.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [EvaluationComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class EvaluationModule {}
