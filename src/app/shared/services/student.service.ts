import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { User } from "../models/User";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  private students: User[] = [];
  private studentsUpdated = new Subject<{
    students: User[];
    studentCount: number;
  }>();
  private studentStatusListener = new Subject<boolean>();
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

    return this.http
      .post("http://localhost:3000/api/student", studentData)
      .subscribe(
        (responseData) => {
          this.router.navigate(["/ecms/students"]);
          this.studentStatusListener.next(true);
        },
        (error) => {
          this.studentStatusListener.next(false);
        }
      );
  }

  getStudentStatusListener() {
    return this.studentStatusListener.asObservable();
  }

  getStudents(studentPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${studentPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; students: any; count: number }>(
        "http://localhost:3000/api/student" + queryParams
      )
      .pipe(
        map((studentData) => {
          return {
            students: studentData.students.map((student) => {
              return {
                fullName: student.fullName,
                email: student.email,
                role: student.role,
                emailParent: student.emailParent,
                section: student.section,
                id: student._id,
                group: student.group,
                payement: student.payement,
              };
            }),
            count: studentData.count,
          };
        })
      )
      .subscribe(
        (transformedStudent) => {
          // console.log(transformedStudent);
          this.students = transformedStudent.students;
          this.studentsUpdated.next({
            students: [...this.students],
            studentCount: transformedStudent.count,
          });
        },
        (error) => {}
      );
  }

  getStudentUpdateListener() {
    return this.studentsUpdated.asObservable();
  }
  updateStudent(
    id: string,
    fullName: string,
    email: string,
    emailParent: string,
    section: string,
    group: string,
    payement: string
  ) {
    let studentData = {
      fullName: fullName,
      email: email,
      emailParent: emailParent,
      section: section,
      group: group,
      payement: payement,
    };
    return this.http
      .put("http://localhost:3000/api/student/" + id, studentData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/students"]);
      });
  }

  getStudent(id: string) {
    return this.http.get<{
      _id: string;
      fullName: string;
      email: string;
      role: string;
      emailParent: string;
      section: string;
      group: string;
      payement: string;
    }>("http://localhost:3000/api/auth/" + id);
  }

  deleteStudent(studentId: string) {
    return this.http.delete("http://localhost:3000/api/student/" + studentId);
  }
}
