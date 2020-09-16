import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  constructor(private http: HttpClient, private router: Router) {}

  addCourse(subjectId: string, courses: File) {
    const formData = new FormData();
    formData.append("subjectId", subjectId);
    formData.append("file", courses);
    console.log(courses);

    this.http
      .post("http://localhost:3000/api/subject/courses", formData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/subject"]);
      });
  }
}
