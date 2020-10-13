import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Cv } from "../models/Cv";

@Injectable({
  providedIn: "root",
})
export class CvService {
  constructor(private http: HttpClient, private router: Router) {}

  saveCv(cv: Cv) {
    let data = {
      profile: cv.profile,
      skills: cv.skills,
      projects: cv.projects,
    };

    this.http
      .post("http://localhost:3000/api/cv", data)
      .subscribe((response) => {
        console.log(response);
      });
  }

  getCv() {
    return this.http.get("http://localhost:3000/api/cv/detail");
  }
}
