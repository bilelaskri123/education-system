import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TimeTableService } from "src/app/shared/services/timeTable.service";

@Component({
  selector: "app-timetable",
  templateUrl: "./timetable.component.html",
  styleUrls: ["./timetable.component.scss"],
})
export class TimetableComponent implements OnInit {
  timeTables: any;
  constructor(
    private router: Router,
    private timeTableService: TimeTableService
  ) {}

  ngOnInit() {
    this.timeTableService.getTimeTables().subscribe((timeTables) => {
      this.timeTables = timeTables;
      console.log(timeTables);
    });
  }

  addTimeTable() {
    this.router.navigate(["/ecms/new-time-table"]);
  }
}
