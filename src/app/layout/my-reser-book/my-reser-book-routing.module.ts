import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyReserBookComponent } from "./my-reser-book.component";

const routes: Routes = [
  {
    path: "",
    component: MyReserBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyReserBookRoutingModule {}
