import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewEvaluationComponent } from './new-evaluation.component';


const routes: Routes = [
  {
    path: "",
    component: NewEvaluationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewEvaluationRoutingModule { }
