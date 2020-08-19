import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayementComponent } from './payement.component';


const routes: Routes = [
  {
    path: '',
    component: PayementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayementRoutingModule { }
