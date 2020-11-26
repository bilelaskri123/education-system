import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Evaluation } from "src/app/shared/models/Evaluation";
import { AuthService } from "src/app/shared/services/auth.service";
import { EvaluationService } from "src/app/shared/services/evaluation.service";

@Component({
  selector: "app-evaluation-detail",
  templateUrl: "./evaluation-detail.component.html",
  styleUrls: ["./evaluation-detail.component.scss"],
})
export class EvaluationDetailComponent implements OnInit {
  @Input() evaluation: Evaluation;
  role: string;
  messageDeleted: string = "";
  constructor(
    private evaluationService: EvaluationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAuth();
  }

  getAuth() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
  }

  onDelete(id: string) {
    this.evaluationService.deleteEvaluation(id).subscribe((message) => {
      this.messageDeleted = message.message;
      setTimeout(() => {
        this.messageDeleted = "";
      }, 2000);
      this.router.navigate(["/ecms/evaluation"]);
    });
  }
}
