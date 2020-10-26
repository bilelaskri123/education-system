import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { CvService } from "src/app/shared/services/cv.service";

@Component({
  selector: "app-cv-detail",
  templateUrl: "./cv-detail.component.html",
  styleUrls: ["./cv-detail.component.scss"],
})
export class CvDetailComponent implements OnInit {
  constructor(
    private cvService: CvService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCvDetail();
  }

  getCvDetail() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      let userId = paramMap.get("userId");
      this.cvService.getCvDetailById(userId).subscribe((cvDetail) => {
        console.log(cvDetail);
      });
    });
  }
}
