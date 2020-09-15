import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  constructor(private http: HttpClient, private router: Router) {}

  addCourse(subjectId: string, courses: File) {
    const courseData = new FormData();

    courseData.append("subjectId", subjectId);
    courseData.append("courses", courses);

    this.http
      .post("http://localhost:3000/api/subject", courseData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/subject"]);
      });
  }
}
