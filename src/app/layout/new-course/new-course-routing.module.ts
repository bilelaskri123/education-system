import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewCourseComponent } from "./new-course.component";

const routes: Routes = [
  {
    path: "",
    component: NewCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCourseRoutingModule {}
