import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Group } from "src/app/shared/models/Group";

@Component({
  selector: "app-group-item",
  templateUrl: "./group-item.component.html",
  styleUrls: ["./group-item.component.scss"],
})
export class GroupItemComponent implements OnInit {
  @Input() group: Group;
  @Output() selectedGroup = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  selectGroup() {
    this.selectedGroup.emit(this.group);
  }
}
