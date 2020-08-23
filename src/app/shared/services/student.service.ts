import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  constructor(private http: HttpClient, private router: Router) {}

  addStudent(
    fullName: string,
    email: string,
    password: string,
    role: string,
    emailParent: string,
    section: string,
    group: string,
    payement: string
  ) {
    let studentData = {
      fullName: fullName,
      email: email,
      password: password,
      role: role,
      emailParent: emailParent,
      section: section,
      group: group,
      payement: payement,
    };

    return this.http.post(
      "http://localhost:3000/api/auth/student",
      studentData
    );
  }

  getStudents() {
    return this.http.get("http://localhost:3000/api/auth/students");
  }
}
