import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddTeacherComponent } from "./add-teacher.component";

const routes: Routes = [
  {
    path: "",
    component: AddTeacherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTeacherRoutingModule {}
