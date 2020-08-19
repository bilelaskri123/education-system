import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentsRoutingModule } from './parents-routing.module';
import { ParentsComponent } from './parents.component';

import { MaterialModule } from '../../shared/material/material.module'

@NgModule({
  declarations: [ParentsComponent],
  imports: [
    CommonModule,
    ParentsRoutingModule,
    MaterialModule
  ]
})
export class ParentsModule { }
