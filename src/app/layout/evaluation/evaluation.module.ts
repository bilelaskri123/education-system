import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EvaluationRoutingModule } from "./evaluation-routing.module";
import { EvaluationComponent } from "./evaluation.component";
import { MaterialModule } from "../../shared/material/material.module";
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';
import { EvaluationItemComponent } from './evaluation-item/evaluation-item.component';
import { NavEvaluationComponent } from './nav-evaluation/nav-evaluation.component';

@NgModule({
  declarations: [EvaluationComponent, EvaluationDetailComponent, EvaluationItemComponent, NavEvaluationComponent],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    MaterialModule,
  ],
})
export class EvaluationModule {}
