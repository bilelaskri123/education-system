import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CourseService } from "src/app/shared/services/Course.service";
import { saveAs } from "file-saver";

@Component({
  selector: "app-my-course",
  templateUrl: "./my-course.component.html",
  styleUrls: ["./my-course.component.scss"],
})
export class MyCourseComponent implements OnInit {
  subjectId: string;
  courses: any;
  constructor(
    public route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("subjectId")) {
        this.subjectId = paramMap.get("subjectId");
        console.log(this.subjectId);
      }
    });

    this.courseService.getCourses(this.subjectId).subscribe((data) => {
      this.courses = data;
      console.log(data);
    });
  }

  download(filename: string) {
    this.courseService.downloadFile(filename).subscribe((data) => {
      saveAs(data, filename);
    });
  }
}
