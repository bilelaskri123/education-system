import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Attandance } from "src/app/shared/models/Attandance";

@Component({
  selector: "app-attendance-item",
  templateUrl: "./attendance-item.component.html",
  styleUrls: ["./attendance-item.component.scss"],
})
export class AttendanceItemComponent implements OnInit {
  @Input() attandance: Attandance;
  @Output() selectedAttandance = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  selectAttandance() {
    this.selectedAttandance.emit(this.attandance);
  }
}
