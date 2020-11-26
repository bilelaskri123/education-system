import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { StudentService } from "src/app/shared/services/student.service";
import { SectionService } from "src/app/shared/services/section.service";
import { GroupService } from "src/app/shared/services/group.service";
import { Subscription } from "rxjs";
import { Section } from "src/app/shared/models/Section";
import { Group } from "src/app/shared/models/Group";
import { User } from "src/app/shared/models/User";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"],
})
export class AddStudentComponent implements OnInit, OnDestroy {
  student: any;
  hide = true;
  isLoading = false;
  private role: string = "student";
  mode = "create";
  private studentId: string;
  form: FormGroup;
  private authSub: Subscription;

  public sectionSub: Subscription;
  public sections: Section[] = [];

  public groupSub: Subscription;
  public groups: Group[] = [];
  public selectedGroups: Group[] = [];
  constructor(
    public studentService: StudentService,
    private sectionService: SectionService,
    private groupService: GroupService,
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

    this.groupService.getGroups(1000, 1);
    this.groupSub = this.groupService
      .getGroupUpdateListener()
      .subscribe((groupData: { groups: Group[]; groupCount: number }) => {
        this.isLoading = false;
        this.groups = groupData.groups;
      });

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
      emailParent: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      section: new FormControl(null, { validators: [Validators.required] }),
      group: new FormControl(null, { validators: [Validators.required] }),
      payement: new FormControl(null, { validators: [Validators.required] }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("studentId")) {
        this.mode = "edit";
        this.form.get("password").clearValidators();
        this.studentId = paramMap.get("studentId");
        this.isLoading = true;
        this.studentService
          .getStudent(this.studentId)
          .subscribe((studentData) => {
            console.log(studentData);
            this.isLoading = false;
            this.student = {
              id: studentData._id,
              fullName: studentData.fullName,
              email: studentData.email,
              emailParent: studentData.emailParent,
              section: studentData.section,
              group: studentData.group,
              payement: studentData.payement,
            };
            this.form.patchValue({
              fullName: this.student.fullName,
              email: this.student.email,
              emailParent: this.student.emailParent,
              section: this.student.section,
              group: this.student.group,
              payement: this.student.payement,
            });
          });
      } else {
        this.mode = "create";
        this.studentId = null;
      }
    });

    this.authSub = this.studentService
      .getStudentStatusListener()
      .subscribe((response) => {
        console.log(response);
        this.isLoading = false;
      });
  }

  onSaveStudent() {
    this.isLoading = true;
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.studentService.addStudent(
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.password,
        this.role,
        this.form.value.emailParent,
        this.form.value.section,
        this.form.value.group,
        this.form.value.payement
      );
    }
    if (this.mode == "edit") {
      console.log(this.mode);
      this.studentService.updateStudent(
        this.studentId,
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.emailParent,
        this.form.value.section,
        this.form.value.group,
        this.form.value.payement
      );
    }

    this.form.reset();
  }

  getSection(obj) {
    let sectionId = obj.value;
    this.selectedGroups = [];
    this.groups.forEach((group) => {
      if (group.section._id == sectionId) {
        this.selectedGroups.push(group);
      }
    });
  }

  cancelForm() {
    this.router.navigate(["/ecms/students"]);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
