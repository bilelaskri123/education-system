import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DemandeBookComponent } from "./demande-book.component";

const routes: Routes = [
  {
    path: "",
    component: DemandeBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandeBookRoutingModule {}
