import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../models/User";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class TeacherService {
  private teachers: User[] = [];
  private teachersUpdated = new Subject<{
    teachers: User[];
    teacherCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  addTeacher(
    fullName: string,
    email: string,
    password: string,
    speciality: string,
    salary: number,
    role: string
  ) {
    let teacherData = {
      fullName: fullName,
      email: email,
      password: password,
      speciality: speciality,
      salary: salary,
      role: role,
    };

    console.log(teacherData);

    return this.http
      .post("http://localhost:3000/api/teacher", teacherData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/teachers"]);
      });
  }

  getTeachers(teacherPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${teacherPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; teachers: any; count: number }>(
        "http://localhost:3000/api/teacher" + queryParams
      )
      .pipe(
        map((teacherData) => {
          // console.log(teacherData);
          return {
            teachers: teacherData.teachers.map((teacher) => {
              return {
                fullName: teacher.fullName,
                email: teacher.email,
                role: teacher.role,
                salary: teacher.salary,
                speciality: teacher.speciality,
                id: teacher._id,
              };
            }),
            count: teacherData.count,
          };
        })
      )
      .subscribe((transformedTeacher) => {
        // console.log(transformedTeacher);
        this.teachers = transformedTeacher.teachers;
        this.teachersUpdated.next({
          teachers: [...this.teachers],
          teacherCount: transformedTeacher.count,
        });
      });
  }

  getTeacherUpdateListener() {
    return this.teachersUpdated.asObservable();
  }

  updateTeacher(
    id: string,
    fullName: string,
    email: string,
    speciality: string,
    salary: number
  ) {
    let teacherData = {
      fullName: fullName,
      email: email,
      speciality: speciality,
      salary: salary,
    };

    return this.http
      .put("http://localhost:3000/api/teacher/" + id, teacherData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/teachers"]);
      });
  }

  getTeacher(id: string) {
    return this.http.get<{
      _id: string;
      fullName: string;
      email: string;
      role: string;
      speciality: string;
      salary: number;
    }>("http://localhost:3000/api/teacher/" + id);
  }

  deleteTeacher(teacherId: string) {
    return this.http.delete("http://localhost:3000/api/teacher/" + teacherId);
  }
}
