import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Attandance } from "../models/Attandance";

@Injectable({ providedIn: "root" })
export class AttandanceService {
  private URL = "http://localhost:3000/api/attandance";
  private attandances: Attandance[] = [];
  private evaluationUpdated = new Subject<{
    attandances: Attandance[];
    attandanceCount: number;
  }>();
  constructor(private http: HttpClient, private router: Router) {}

  addAttandance(section: string, group: string, lesson: string, students: any) {
    let attandance = {
      section: section,
      group: group,
      lesson: lesson,
      students: students,
    };
    console.log(attandance);
    this.http.post(this.URL, attandance).subscribe(() => {
      this.router.navigate(["/ecms/attendance"]);
    });
  }

  getAttandances(
    attandancePerPage: number,
    currentPage: number,
    section: string,
    group: string,
    lesson: string
  ) {
    const queryParams = `?pagesize=${attandancePerPage}&page=${currentPage}&section=${section}&group=${group}&lesson=${lesson}`;
    this.http
      .get<{ attandances: Attandance[]; maxAttandance: number }>(
        this.URL + queryParams
      )
      .pipe(
        map((attandanceData) => {
          return {
            attandances: attandanceData.attandances.map((attandance) => {
              return {
                _id: attandance._id,
                date: attandance.date,
                section: attandance.section,
                group: attandance.group,
                lesson: attandance.lesson,
                students: attandance.students,
              };
            }),
            maxAttandance: attandanceData.maxAttandance,
          };
        })
      )
      .subscribe((transformedEvaluationData) => {
        this.attandances = transformedEvaluationData.attandances;
        this.evaluationUpdated.next({
          attandances: [...this.attandances],
          attandanceCount: transformedEvaluationData.maxAttandance,
        });
      });
  }

  getEvaluationUpdateListener() {
    return this.evaluationUpdated.asObservable();
  }

  deleteAttandance(attandanceId: string) {
    return this.http.delete<{ message: string }>(this.URL + "/" + attandanceId);
  }
}
