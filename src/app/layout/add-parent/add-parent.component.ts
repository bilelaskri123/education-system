import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
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
  private role: string = "parent";

  students: User[] = [];
  private studentsSub: Subscription;

  constructor(
    public parentService: ParentService,
    private studentService: StudentService,
    private router: Router
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
  }

  addParent(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log(form.value);
    this.parentService.addParent(
      form.value.fullName,
      form.value.email,
      form.value.password,
      this.role,
      form.value.childEmail
    );

    form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/parents"]);
  }
}
