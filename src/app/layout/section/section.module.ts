import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SectionRoutingModule } from "./section-routing.module";
import { SectionComponent } from "./section.component";
import { MaterialModule } from "src/app/shared/material/material.module";
import { SectionItemComponent } from './section-item/section-item.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { NavSectionComponent } from './nav-section/nav-section.component';

@NgModule({
  declarations: [SectionComponent, SectionItemComponent, SectionDetailComponent, NavSectionComponent],
  imports: [CommonModule, SectionRoutingModule, MaterialModule],
})
export class SectionModule {}
