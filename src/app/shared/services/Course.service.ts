import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

let URLCOURSE = "http://localhost:3000/api/subject/courses";
@Injectable({
  providedIn: "root",
})
export class CourseService {
  constructor(private http: HttpClient, private router: Router) {}

  uploadWithProgress(formData: FormData): Observable<any> {
    return this.http
      .post(URLCOURSE, formData, { observe: "events", reportProgress: true })
      .pipe(catchError((err) => this.handleError(err)));
  }
  private handleError(error: any) {
    return throwError(error);
  }

  getCourses(id: string) {
    return this.http.get("http://localhost:3000/api/subject/my-course/" + id);
  }

  downloadFile(file: string) {
    var body = { filename: file };

    return this.http.post(
      "http://localhost:3000/api/subject/my-course/" + "download",
      body,
      {
        responseType: "blob",
      }
    );
  }
}
