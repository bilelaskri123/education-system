import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NewProgramComponent } from "./new-program.component";

const routes: Routes = [
  {
    path: "",
    component: NewProgramComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewProgramRoutingModule {}
