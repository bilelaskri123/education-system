import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Lesson } from "../models/Lesson";

const URLSUBJECT = "http://localhost:3000/api/subject";
const URLTEACHER = "http://localhost:3000/api/teacher/all";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  private subjects: Lesson[] = [];
  private subjectsUpdated = new Subject<{
    subjects: Lesson[];
    subjectsCount: number;
  }>();
  constructor(private http: HttpClient, private router: Router) {}

  getTeachers() {
    return this.http.get(URLTEACHER);
  }

  addSubject(
    name: string,
    coefficient: number,
    description: string,
    teachers: string[]
  ) {
    let Subject = {
      name: name,
      coefficient: coefficient,
      description: description,
      teachers: teachers,
    };

    console.log(Subject);
    this.http
      .post<{ message: string }>(URLSUBJECT, Subject)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/subject"]);
      });
  }

  getSubjects(subjectsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${subjectsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; subjects: any; maxSubjects: number }>(
        URLSUBJECT + queryParams
      )
      .pipe(
        map((subjectData) => {
          return {
            subjects: subjectData.subjects.map((subject) => {
              return {
                name: subject.name,
                coefficient: subject.coefficient,
                teachers: subject.teachers,
                description: subject.description,
                id: subject._id,
              };
            }),
            maxSubjects: subjectData.maxSubjects,
          };
        })
      )
      .subscribe((transformedSubjectsData) => {
        this.subjects = transformedSubjectsData.subjects;
        this.subjectsUpdated.next({
          subjects: [...this.subjects],
          subjectsCount: transformedSubjectsData.maxSubjects,
        });
      });
  }

  getSubjectUpdateListener() {
    return this.subjectsUpdated.asObservable();
  }

  getSubject(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      coefficient: number;
      description: string;
      teachers: [
        {
          _id: string;
          fullName: string;
        }
      ];
    }>(URLSUBJECT + "/" + id);
  }

  updateSubject(
    id: string,
    name: string,
    coefficient: number,
    description: string,
    teachers: string[]
  ) {
    let Data = {
      id: id,
      name: name,
      coefficient: coefficient,
      description: description,
      teachers: teachers,
    };

    return this.http.put(URLSUBJECT + "/" + id, Data).subscribe((response) => {
      this.router.navigate(["/ecms/subject"]);
    });
  }

  deleteSubject(id: string) {
    return this.http.delete(URLSUBJECT + "/" + id);
  }
}
