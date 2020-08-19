import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddParentComponent } from "./add-parent.component";

const routes: Routes = [
  {
    path: "",
    component: AddParentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddParentRoutingModule {}
