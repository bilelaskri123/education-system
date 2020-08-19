import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddAccountantComponent } from "./add-accountant.component";

const routes: Routes = [
  {
    path: "",
    component: AddAccountantComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAccountantRoutingModule {}
