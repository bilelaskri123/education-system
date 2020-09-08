import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddReserBookComponent } from "./add-reser-book.component";

const routes: Routes = [
  {
    path: "",
    component: AddReserBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReserBookRoutingModule {}
