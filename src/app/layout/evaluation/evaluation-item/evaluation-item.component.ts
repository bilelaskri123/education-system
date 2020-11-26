import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Evaluation } from "src/app/shared/models/Evaluation";

@Component({
  selector: "app-evaluation-item",
  templateUrl: "./evaluation-item.component.html",
  styleUrls: ["./evaluation-item.component.scss"],
})
export class EvaluationItemComponent implements OnInit {
  @Input() evaluation: Evaluation;
  @Output() selectedEvaluation = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selectEvaluation() {
    this.selectedEvaluation.emit(this.evaluation);
  }
}
