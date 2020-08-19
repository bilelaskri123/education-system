import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrarianRoutingModule } from './librarian-routing.module';
import { LibrarianComponent } from './librarian.component';
import { MaterialModule } from '../../shared/material/material.module';


@NgModule({
  declarations: [LibrarianComponent],
  imports: [
    CommonModule,
    LibrarianRoutingModule,
    MaterialModule
  ]
})
export class LibrarianModule { }
