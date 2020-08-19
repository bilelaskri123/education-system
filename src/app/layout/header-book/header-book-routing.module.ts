import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeaderBookComponent } from "./header-book.component";

const routes: Routes = [
  {
    path: "",
    component: HeaderBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeaderBookRoutingModule {}
