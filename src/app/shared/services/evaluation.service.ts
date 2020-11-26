import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Evaluation } from "../models/Evaluation";

@Injectable({
  providedIn: "root",
})
export class EvaluationService {
  private URL = "http://localhost:3000/api/evaluation";
  private evaluations: Evaluation[] = [];
  private evaluationUpdated = new Subject<{
    evaluations: Evaluation[];
    evaluationCount: number;
  }>();
  constructor(private http: HttpClient, private router: Router) {}

  addEvaluation(section: string, group: string, lesson: string, students: any) {
    let evaluation = {
      section: section,
      group: group,
      lesson: lesson,
      students: students,
    };
    console.log(evaluation);
    this.http.post(this.URL, evaluation).subscribe(() => {
      this.router.navigate(["/ecms/evaluation"]);
    });
  }

  getEvaluations(
    evaluationPerPage: number,
    currentPage: number,
    section: string,
    group: string,
    lesson: string
  ) {
    const queryParams = `?pagesize=${evaluationPerPage}&page=${currentPage}&section=${section}&group=${group}&lesson=${lesson}`;
    this.http
      .get<{ evaluations: Evaluation[]; maxEvaluation: number }>(
        this.URL + queryParams
      )
      .pipe(
        map((evaluationData) => {
          return {
            evaluations: evaluationData.evaluations.map((evaluation) => {
              return {
                _id: evaluation._id,
                date: evaluation.date,
                section: evaluation.section,
                group: evaluation.group,
                lesson: evaluation.lesson,
                students: evaluation.students,
              };
            }),
            maxEvaluation: evaluationData.maxEvaluation,
          };
        })
      )
      .subscribe((transformedEvaluationData) => {
        this.evaluations = transformedEvaluationData.evaluations;
        this.evaluationUpdated.next({
          evaluations: [...this.evaluations],
          evaluationCount: transformedEvaluationData.maxEvaluation,
        });
      });
  }

  getEvaluationUpdateListener() {
    return this.evaluationUpdated.asObservable();
  }

  deleteEvaluation(evaluationId: string) {
    return this.http.delete<{ message: string }>(this.URL + "/" + evaluationId);
  }
}
