import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Section } from "src/app/shared/models/Section";

@Component({
  selector: "app-section-item",
  templateUrl: "./section-item.component.html",
  styleUrls: ["./section-item.component.scss"],
})
export class SectionItemComponent implements OnInit {
  @Input() section: Section;
  @Output() selectedSection = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selectSection() {
    this.selectedSection.emit(this.section);
  }
}
