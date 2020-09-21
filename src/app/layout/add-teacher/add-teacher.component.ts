import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SectionService } from "src/app/shared/services/section.service";
import { Section } from "src/app/shared/models/Section";
import { Subscription } from "rxjs";
import { TeacherService } from "src/app/shared/services/teacher.service";

@Component({
  selector: "app-add-teacher",
  templateUrl: "./add-teacher.component.html",
  styleUrls: ["./add-teacher.component.scss"],
})
export class AddTeacherComponent implements OnInit, OnDestroy {
  hide = true;
  isLoading = false;
  private role: string = "teacher";
  form: FormGroup;
  private mode = "create";
  private teacherId: string;
  private teacher: any;

  private teacherSub: Subscription;

  private sectionSub: Subscription;
  public sections: Section[] = [];
  constructor(
    public teacherService: TeacherService,
    public sectionService: SectionService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.sectionService.getSections(1000, 1);
    this.sectionSub = this.sectionService
      .getSectionUpdateListener()
      .subscribe(
        (sectionData: { sections: Section[]; sectionCount: number }) => {
          this.isLoading = false;
          this.sections = sectionData.sections;
        }
      );

    this.form = new FormGroup({
      fullName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      speciality: new FormControl(null, {
        validators: [Validators.required],
      }),
      salary: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("teacherId")) {
        this.mode = "edit";
        this.form.get("password").clearValidators();
        this.teacherId = paramMap.get("teacherId");
        this.isLoading = true;
        this.teacherService
          .getTeacher(this.teacherId)
          .subscribe((teacherData) => {
            console.log(teacherData);
            this.isLoading = false;
            this.teacher = {
              id: teacherData._id,
              fullName: teacherData.fullName,
              email: teacherData.email,
              speciality: teacherData.speciality,
              salary: teacherData.salary,
            };
            console.log(this.teacher);
            this.form.patchValue({
              fullName: teacherData.fullName,
              email: teacherData.email,
              speciality: teacherData.speciality,
              salary: teacherData.salary,
            });
          });
      } else {
        this.mode = "create";
        this.teacherId = null;
      }
    });

    this.teacherSub = this.teacherService
      .getTeacherUpdateListener()
      .subscribe((response) => {
        console.log(response);
        this.isLoading = false;
      });
  }

  onSaveTeacher() {
    this.isLoading = true;
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.teacherService.addTeacher(
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.password,
        this.form.value.speciality,
        this.form.value.salary,
        this.role
      );
    }
    if (this.mode == "edit") {
      this.teacherService.updateTeacher(
        this.teacherId,
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.speciality,
        this.form.value.salary
      );
    }

    this.form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/teachers"]);
  }

  ngOnDestroy() {
    this.teacherSub.unsubscribe();
  }
}
