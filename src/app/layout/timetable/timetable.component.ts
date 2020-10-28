import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TimeTableService } from "src/app/shared/services/timeTable.service";
import { saveAs } from "file-saver";
import { AuthService } from "src/app/shared/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-timetable",
  templateUrl: "./timetable.component.html",
  styleUrls: ["./timetable.component.scss"],
})
export class TimetableComponent implements OnInit {
  timeTables: any;
  role: string;
  isLoading = false;
  private timeTableSub: Subscription;
  constructor(
    private router: Router,
    private timeTableService: TimeTableService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
    this.timeTableService.getTimeTables();
    this.timeTableSub = this.timeTableService
      .getTimeTablesUpdatedListener()
      .subscribe((timeTableData: { timeTables: any }) => {
        this.timeTables = timeTableData.timeTables;
        console.log(this.timeTables);
      });

    this.timeTableService.getTimeTables();
  }

  addTimeTable() {
    this.router.navigate(["/ecms/new-time-table"]);
  }

  download(filename) {
    this.timeTableService.downloadFile(filename).subscribe((data) => {
      saveAs(data, filename);
      console.log(data);
    });
  }

  deleteTable(id: string) {
    this.timeTableService.deleteTable(id).subscribe((message) => {
      this.timeTableService.getTimeTables();
    });
  }
}
