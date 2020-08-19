import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SignupRoutingModule } from "./signup-routing.module";
import { SignupComponent } from "./signup.component";
import { MaterialModule } from "../shared/material/material.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SignupRoutingModule, MaterialModule, FormsModule],
})
export class SignupModule {}
