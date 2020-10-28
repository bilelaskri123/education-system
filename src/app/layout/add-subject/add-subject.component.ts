import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Lesson } from "src/app/shared/models/Lesson";
import { SubjectService } from "src/app/shared/services/subject.service";

@Component({
  selector: "app-add-subject",
  templateUrl: "./add-subject.component.html",
  styleUrls: ["./add-subject.component.scss"],
})
export class AddSubjectComponent implements OnInit {
  lesson: Lesson;
  isLoading = false;
  teachers: any;
  form: FormGroup;
  private mode = "create";
  private subjectId: string;
  constructor(
    private router: Router,
    private subjectService: SubjectService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subjectService.getTeachers().subscribe((teachers) => {
      this.teachers = teachers;
      console.log(teachers);
    });

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),

      coefficient: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      teachers: new FormControl(null, {
        validators: [Validators.required],
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("subjectId")) {
        this.mode = "edit";
        this.subjectId = paramMap.get("subjectId");
        this.isLoading = true;
        this.subjectService
          .getSubject(this.subjectId)
          .subscribe((subjectData) => {
            this.isLoading = false;
            this.lesson = {
              id: subjectData._id,
              name: subjectData.name,
              coefficient: subjectData.coefficient,
              description: subjectData.description,
              teachers: subjectData.teachers,
            };

            this.form.patchValue({
              name: this.lesson.name,
              coefficient: this.lesson.coefficient,
              description: this.lesson.description,
              teachers: this.lesson.teachers,
            });
          });
      } else {
        this.mode = "create";
        this.subjectId = null;
      }
    });
  }

  onSaveSubject() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
    this.isLoading = true;
    if (this.mode === "create") {
      this.subjectService.addSubject(
        this.form.value.name,
        this.form.value.coefficient,
        this.form.value.description,
        this.form.value.teachers
      );
    } else {
      console.log(this.form.value);
      this.subjectService.updateSubject(
        this.subjectId,
        this.form.value.name,
        this.form.value.coefficient,
        this.form.value.description,
        this.form.value.teachers
      );
    }
    this.form.reset();
  }

  cancelForm() {
    this.form.reset();
    this.router.navigate(["/ecms/subject"]);
  }
}
