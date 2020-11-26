import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DemandeProductComponent } from "./demande-product.component";

const routes: Routes = [
  {
    path: "",
    component: DemandeProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandeProductRoutingModule {}
