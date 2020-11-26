import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Program } from "src/app/shared/models/Program";

@Component({
  selector: "app-program-item",
  templateUrl: "./program-item.component.html",
  styleUrls: ["./program-item.component.scss"],
})
export class ProgramItemComponent implements OnInit {
  @Input() program: Program;
  @Output() selectedProgram = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selectProgram() {
    this.selectedProgram.emit(this.program);
  }
}
