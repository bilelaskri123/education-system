import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Group } from "src/app/shared/models/Group";
import { GroupService } from "src/app/shared/services/group.service";
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"],
})
export class GroupComponent implements OnInit {
  role: string;
  isLoading = false;
  groups: Group[] = [];
  private groupSub: Subscription;

  totalGroup = 0;
  groupPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(
    private groupService: GroupService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
    this.isLoading = true;
    this.groupService.getGroups(this.groupPerPage, this.currentPage);
    this.groupSub = this.groupService
      .getGroupUpdateListener()
      .subscribe((groupData: { groups: Group[]; groupCount: number }) => {
        this.isLoading = false;
        this.totalGroup = groupData.groupCount;
        this.groups = groupData.groups;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.groupPerPage = pageData.pageSize;
    this.groupService.getGroups(this.groupPerPage, this.currentPage);
  }

  onDelete(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.isLoading = true;
      this.groupService.getGroups(this.groupPerPage, this.currentPage);
    });
  }

  addGroup() {
    this.router.navigate(["/ecms/add-group"]);
  }
}
