import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddLibrarianComponent } from "./add-librarian.component";

const routes: Routes = [
  {
    path: "",
    component: AddLibrarianComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddLibrarianRoutingModule {}
