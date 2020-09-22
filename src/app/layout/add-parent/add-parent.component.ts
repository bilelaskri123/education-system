import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { StudentService } from "src/app/shared/services/student.service";
import { ParentService } from "src/app/shared/services/parent.service";

@Component({
  selector: "app-add-parent",
  templateUrl: "./add-parent.component.html",
  styleUrls: ["./add-parent.component.scss"],
})
export class AddParentComponent implements OnInit {
  hide = true;
  isLoading = false;
  parentId: string;
  parent: any;
  private role: string = "parent";

  students: User[] = [];
  private studentsSub: Subscription;

  form: FormGroup;
  private mode = "create";
  private studentId: string;

  constructor(
    public parentService: ParentService,
    private studentService: StudentService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.studentService.getStudents(1000, 1);
    this.studentsSub = this.studentService
      .getStudentUpdateListener()
      .subscribe((studentData: { students: User[]; studentCount: number }) => {
        this.isLoading = false;
        this.students = studentData.students;
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
      childEmail: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("parentId")) {
        this.mode = "edit";
        this.form.get("password").clearValidators();
        this.parentId = paramMap.get("parentId");
        this.isLoading = true;
        this.parentService.getParent(this.parentId).subscribe((parentData) => {
          this.isLoading = false;
          this.parent = {
            id: parentData._id,
            fullName: parentData.fullName,
            email: parentData.email,
            childEmail: parentData.childEmail,
          };
          this.form.patchValue({
            fullName: parentData.fullName,
            email: parentData.email,
            childEmail: parentData.childEmail,
          });
        });
      } else {
        this.mode = "create";
        this.studentId = null;
      }
    });
  }

  onSaveParent() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == "create") {
      this.parentService.addParent(
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.password,
        this.role,
        this.form.value.childEmail
      );
    } else {
      this.parentService.updateParent(
        this.parentId,
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.childEmail
      );
    }

    this.form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/parents"]);
  }
}
