import { Component, Input, OnInit } from "@angular/core";
import { Group } from "src/app/shared/models/Group";
import { AuthService } from "src/app/shared/services/auth.service";
import { GroupService } from "src/app/shared/services/group.service";

@Component({
  selector: "app-group-detail",
  templateUrl: "./group-detail.component.html",
  styleUrls: ["./group-detail.component.scss"],
})
export class GroupDetailComponent implements OnInit {
  @Input() group: Group;
  role: string;
  constructor(
    private groupService: GroupService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAuth();
  }

  getAuth() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
  }

  onDelete(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.groupService.getGroups(5, 1);
    });
  }
}
