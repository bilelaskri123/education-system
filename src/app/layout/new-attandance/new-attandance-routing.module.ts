import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewAttandanceComponent } from './new-attandance.component';


const routes: Routes = [
  {
    path: "",
    component: NewAttandanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAttandanceRoutingModule { }
