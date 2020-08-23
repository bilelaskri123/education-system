import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ParentService {
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
    return this.http.post("http://localhost:3000/api/auth/parent", parentData);
  }
}
