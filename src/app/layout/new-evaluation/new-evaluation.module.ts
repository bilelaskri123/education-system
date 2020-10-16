import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewEvaluationRoutingModule } from './new-evaluation-routing.module';
import { NewEvaluationComponent } from './new-evaluation.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewEvaluationComponent],
  imports: [
    CommonModule,
    NewEvaluationRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class NewEvaluationModule { }
