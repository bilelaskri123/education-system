import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddSubjectComponent } from "./add-subject.component";

const routes: Routes = [
  {
    path: "",
    component: AddSubjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddSubjectRoutingModule {}
