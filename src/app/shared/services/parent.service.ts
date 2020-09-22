import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { User } from "../models/User";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ParentService {
  private parents: User[] = [];
  private parentsUpdated = new Subject<{
    parents: User[];
    parentCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  addParent(
    fullName: string,
    email: string,
    password: string,
    role: string,
    childEmail: string
  ) {
    let parentData = {
      fullName: fullName,
      email: email,
      password: password,
      role: role,
      childEmail: childEmail,
    };
    return this.http
      .post("http://localhost:3000/api/parent", parentData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/parents"]);
      });
  }

  getParents(parentPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${parentPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; parents: any; count: number }>(
        "http://localhost:3000/api/parent" + queryParams
      )
      .pipe(
        map((parentData) => {
          // console.log(parentData);
          return {
            parents: parentData.parents.map((parent) => {
              return {
                fullName: parent.fullName,
                email: parent.email,
                role: parent.role,
                childEmail: parent.childEmail,
                id: parent._id,
              };
            }),
            count: parentData.count,
          };
        })
      )
      .subscribe((transformedParent) => {
        this.parents = transformedParent.parents;
        this.parentsUpdated.next({
          parents: [...this.parents],
          parentCount: transformedParent.count,
        });
      });
  }

  getParentUpdateListener() {
    return this.parentsUpdated.asObservable();
  }

  getParent(id: string) {
    return this.http.get<{
      _id: string;
      fullName: string;
      email: string;
      role: string;
      childEmail: string;
    }>("http://localhost:3000/api/parent/" + id);
  }

  updateParent(
    id: string,
    fullName: string,
    email: string,
    childEmail: string
  ) {
    let parentData = {
      fullName: fullName,
      email: email,
      childEmail: childEmail,
    };
    return this.http
      .put("http://localhost:3000/api/parent/" + id, parentData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/parents"]);
      });
  }

  deleteParent(parentId: string) {
    return this.http.delete("http://localhost:3000/api/parent/" + parentId);
  }
}
