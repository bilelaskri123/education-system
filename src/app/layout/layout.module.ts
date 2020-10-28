import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HttpClientModule } from "@angular/common/http";
import { AngularFontAwesomeModule } from "angular-font-awesome";

import { ReactiveFormsModule } from "@angular/forms";
import { AdminGuard } from "../shared/auth/admin.guard";

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],

  providers: [AdminGuard],
})
export class LayoutModule {}
