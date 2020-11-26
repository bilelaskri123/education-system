import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Group } from "src/app/shared/models/Group";

@Component({
  selector: "app-nav-group",
  templateUrl: "./nav-group.component.html",
  styleUrls: ["./nav-group.component.scss"],
})
export class NavGroupComponent implements OnInit {
  @Input() groups: Group[];
  @Output() selectedGroup = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selectGroup(selectedGroup) {
    this.selectedGroup.emit(selectedGroup);
  }
}
