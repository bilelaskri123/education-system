import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountantComponent } from "./accountant.component";

const routes: Routes = [
  {
    path: "",
    component: AccountantComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountantRoutingModule {}
