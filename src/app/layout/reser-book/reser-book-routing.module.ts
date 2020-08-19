import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReserBookComponent } from "./reser-book.component";

const routes: Routes = [
  {
    path: "",
    component: ReserBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReserBookRoutingModule {}
