import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Attandance } from "src/app/shared/models/Attandance";

@Component({
  selector: "app-nav-attendance",
  templateUrl: "./nav-attendance.component.html",
  styleUrls: ["./nav-attendance.component.scss"],
})
export class NavAttendanceComponent implements OnInit {
  @Input() attandances: Attandance[];
  @Output() selectedAttandance = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  selectAttandance(selectedAttandance) {
    this.selectedAttandance.emit(selectedAttandance);
  }
}
