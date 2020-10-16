import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { Group } from "src/app/shared/models/Group";
import { Section } from "src/app/shared/models/Section";
import { GroupService } from "src/app/shared/services/group.service";
import { ProgramService } from "src/app/shared/services/program.service";
import { SectionService } from "src/app/shared/services/section.service";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"],
})
export class AttendanceComponent implements OnInit {
  isLoading = false;
  constructor(private router: Router) {}

  ngOnInit() {
   
  }

  newAttandance() {
    this.router.navigate(['/ecms/new-attandance']);
  }
}
