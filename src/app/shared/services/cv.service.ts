import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { Cv } from "../models/Cv";

@Injectable({
  providedIn: "root",
})
export class CvService {
  private cv: Cv;
  private cvsUpdated = new Subject<{ cv: Cv }>();
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

  getCv() {
    return this.http.get<{cv: Cv}>("http://localhost:3000/api/cv/detail");
    //  this.http.get<{cv: Cv}>("http://localhost:3000/api/cv/detail").pipe(map((cvData) => {
    //    console.log(cvData)
    //    return {
    //      profile: cvData.cv.profile,
    //      skills: cvData.cv.skills.map((skill) => {
    //        return {
    //          id: skill.id,
    //          skill: skill.skill,
    //          level: skill.level
    //        }
    //      }),
    //      projects: cvData.cv.projects.map((project) => {
    //        return {
    //          id: project.id,
    //          project: project.project,
    //          description: project.description
    //        }
    //      }),
    //      langues: cvData.cv.langues.map((langue) => {
    //        return {
    //          id: langue.id,
    //          langue: langue.langue,
    //          level: langue.level
    //        }
    //      }),
    //    }
    //  }))
  }

  // getCvUpdateListener() {
  //   return this.cvsUpdated.asObservable();
  // }
}
