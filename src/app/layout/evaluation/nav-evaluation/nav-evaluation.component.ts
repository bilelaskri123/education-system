import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Evaluation } from "src/app/shared/models/Evaluation";

@Component({
  selector: "app-nav-evaluation",
  templateUrl: "./nav-evaluation.component.html",
  styleUrls: ["./nav-evaluation.component.scss"],
})
export class NavEvaluationComponent implements OnInit {
  @Input() evaluations: Evaluation[];
  @Output() selectedEvaluation = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selectEvaluation(selectedEvaluation) {
    this.selectedEvaluation.emit(selectedEvaluation);
  }
}
