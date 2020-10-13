import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CvDetailRoutingModule } from "./cv-detail-routing.module";
import { CvDetailComponent } from "./cv-detail.component";

@NgModule({
  declarations: [CvDetailComponent],
  imports: [CommonModule, CvDetailRoutingModule],
})
export class CvDetailModule {}
