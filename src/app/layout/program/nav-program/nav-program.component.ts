import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Program } from "src/app/shared/models/Program";

@Component({
  selector: "app-nav-program",
  templateUrl: "./nav-program.component.html",
  styleUrls: ["./nav-program.component.scss"],
})
export class NavProgramComponent implements OnInit {
  @Input() programs: Program[];
  @Output() selectedProgram = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  selectProgram(selectedProgram) {
    this.selectedProgram.emit(selectedProgram);
  }
}
