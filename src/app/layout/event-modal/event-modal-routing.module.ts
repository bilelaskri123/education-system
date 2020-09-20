import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventModalComponent } from "./event-modal.component";

const routes: Routes = [
  {
    path: "",
    component: EventModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventModalRoutingModule {}
