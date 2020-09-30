import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyCourseRoutingModule } from './my-course-routing.module';
import { MyCourseComponent } from './my-course.component';


@NgModule({
  declarations: [MyCourseComponent],
  imports: [
    CommonModule,
    MyCourseRoutingModule
  ]
})
export class MyCourseModule { }
