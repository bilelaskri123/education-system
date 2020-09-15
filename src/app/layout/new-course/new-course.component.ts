import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { CourseService } from "src/app/shared/services/Course.service";

@Component({
  selector: "app-new-course",
  templateUrl: "./new-course.component.html",
  styleUrls: ["./new-course.component.scss"],
})
export class NewCourseComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  imagePreview: string;

  subjectId: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      courses: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("subjectId")) {
        this.subjectId = paramMap.get("subjectId");
        console.log(this.subjectId);
      }
    });
  }

  addCourse() {
    this.courseService.addCourse(this.subjectId, this.form.value.courses);
    this.form.reset();
  }
}
