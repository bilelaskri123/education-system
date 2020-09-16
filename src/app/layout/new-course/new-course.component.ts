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

  myForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    file: new FormControl("", [Validators.required]),
    fileSource: new FormControl("", [Validators.required]),
  });

  subjectId: string;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("subjectId")) {
        this.subjectId = paramMap.get("subjectId");
        console.log(this.subjectId);
      }
    });
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }

  submit() {
    console.log(this.myForm.get("fileSource").value);
    this.courseService.addCourse(
      this.subjectId,
      this.myForm.get("fileSource").value
    );
    // .post("http://localhost:8001/upload.php", formData)
    // .subscribe((res) => {
    //   console.log(res);
    //   alert("Uploaded Successfully.");
    // });
  }
}
