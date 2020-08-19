import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MyReserProductComponent } from "./my-reser-product.component";

const routes: Routes = [
  {
    path: "",
    component: MyReserProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyReserProductRoutingModule {}
