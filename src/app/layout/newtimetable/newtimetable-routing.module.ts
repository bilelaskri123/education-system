import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewtimetableComponent } from "./newtimetable.component";

const routes: Routes = [
  {
    path: "",
    component: NewtimetableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewtimetableRoutingModule {}
