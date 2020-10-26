import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs/internal/Subject";
import { map } from "rxjs/operators";
import { Cv } from "../models/Cv";

@Injectable({
  providedIn: "root",
})
export class CvService {
  private cv: Cv;
  private cvUpdated = new Subject<{
    profile: string;
    skills: [{ id: string; skill: string; level: number }];
    langues: [{ id: string; langue: string; level: number }];
    projects: [{ id: string; project: string; description: string }];
  }>();
  constructor(private http: HttpClient, private router: Router) {}

  saveCv(cv: Cv) {
    let data = {
      profile: cv.profile,
      skills: cv.skills,
      projects: cv.projects,
      langues: cv.langues,
    };

    this.http
      .post("http://localhost:3000/api/cv", data)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getCvDetailById(userId: string) {
    return this.http.get<{ cv: Cv }>("http://localhost:3000/api/cv/" + userId);
  }

  // getCv() {
  //   this.http
  //     .get<{ cv: Cv }>("http://localhost:3000/api/cv/detail")
  //     .pipe(
  //       map((cvDetail) => {
  //         return {
  //           profile: cvDetail.cv.profile,
  //           projects: cvDetail.cv.projects,
  //           skills: cvDetail.cv.skills,
  //           langues: cvDetail.cv.langues,
  //         };
  //       })
  //     )
  //     .subscribe((transformedData) => {
  //       this.cv = transformedData;
  //       this.cvUpdated.next({
  //         profile: this.cv.profile,
  //         skills: [...this.cv.skills],
  //         langues: [...this.cv.langues],
  //         projects: [...this.cv.projects],
  //       });
  //     });
  // }

  // getCvUpdatedListener() {
  //   return this.cvUpdated.asObservable();
  // }
}
