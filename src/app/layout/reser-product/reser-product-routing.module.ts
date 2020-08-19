import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ReserProductComponent } from "./reser-product.component";

const routes: Routes = [
  {
    path: "",
    component: ReserProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReserProductRoutingModule {}
