import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyCourseComponent } from "./my-course.component";

const routes: Routes = [
  {
    path: "",
    component: MyCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCourseRoutingModule {}
