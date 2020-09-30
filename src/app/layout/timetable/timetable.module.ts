import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TimetableRoutingModule } from "./timetable-routing.module";
import { TimetableComponent } from "./timetable.component";
import { MaterialModule } from "../../shared/material/material.module";
import { PdfViewerModule } from "ng2-pdf-viewer";

@NgModule({
  declarations: [TimetableComponent],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    MaterialModule,
    PdfViewerModule,
  ],
})
export class TimetableModule {}
