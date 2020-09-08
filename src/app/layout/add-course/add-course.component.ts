import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Group } from "src/app/shared/models/Group";
import { GroupService } from "src/app/shared/services/group.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.scss"],
})
export class AddCourseComponent implements OnInit {
  isLoading = false;
  groups: Group[];
  groupSub: Subscription;
  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.groupService.getGroups(1000, 1);
    this.groupSub = this.groupService
      .getGroupUpdateListener()
      .subscribe((groupData: { groups: Group[]; groupCount: number }) => {
        this.isLoading = false;
        this.groups = groupData.groups;
      });
  }

  addCourse(form: NgForm) {}
}
