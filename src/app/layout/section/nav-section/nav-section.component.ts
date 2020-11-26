import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Section } from "src/app/shared/models/Section";

@Component({
  selector: "app-nav-section",
  templateUrl: "./nav-section.component.html",
  styleUrls: ["./nav-section.component.scss"],
})
export class NavSectionComponent implements OnInit {
  @Input() sections: Section[];
  @Output() selectedSection = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selectSection(selectedSection) {
    this.selectedSection.emit(selectedSection);
  }
}
