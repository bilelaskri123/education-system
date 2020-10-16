import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewAttandanceRoutingModule } from './new-attandance-routing.module';
import { NewAttandanceComponent } from './new-attandance.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [NewAttandanceComponent],
  imports: [
    CommonModule,
    NewAttandanceRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class NewAttandanceModule { }
