import { Injectable } from "@angular/core";
import { Group } from "../models/Group";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GroupService {
  private groups: Group[] = [];
  private groupsUpdated = new Subject<{
    groups: Group[];
    groupCount: number;
  }>();
  constructor(private http: HttpClient, private router: Router) {}

  getGroups(groupsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${groupsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; groups: any; maxGroup: number }>(
        "http://localhost:3000/api/group" + queryParams
      )
      .pipe(
        map((groupData) => {
          // console.log(groupData);
          return {
            groups: groupData.groups.map((group) => {
              return {
                id: group._id,
                name: group.name,
                section: group.section,
                students: group.students,
                level: group.level
              };
            }),
            maxGroup: groupData.maxGroup,
          };
        })
      )
      .subscribe((transformedGroupsData) => {
        this.groups = transformedGroupsData.groups;
        this.groupsUpdated.next({
          groups: [...this.groups],
          groupCount: transformedGroupsData.maxGroup,
        });
      });
  }

  getGroupUpdateListener() {
    return this.groupsUpdated.asObservable();
  }

  addGroup(name: string, section: string, level: string) {
    let group = {
      name: name,
      section: section,
      level: level
    };

    console.log(group);

    this.http
      .post<{ message: string }>("http://localhost:3000/api/group", group)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/group"]);
      });
  }

  deleteGroup(groupId: string) {
    return this.http.delete("http://localhost:3000/api/group/" + groupId);
  }
}
