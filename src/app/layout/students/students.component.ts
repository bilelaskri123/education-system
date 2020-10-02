import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { StudentService } from "src/app/shared/services/student.service";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;

  students: User[] = [];
  private studentsSub: Subscription;

  totalStudents = 0;
  studentPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(private studentService: StudentService, private router: Router) {}
  ngOnInit() {
    this.isLoading = true;

    this.form = new FormGroup({
      search: new FormControl(null, { validators: [Validators.nullValidator] }),
    });

    this.getStudents("");
  }

  public getStudents(filtredBy: string) {
    this.studentService.getStudents(
      this.studentPerPage,
      this.currentPage,
      filtredBy
    );
    this.studentsSub = this.studentService
      .getStudentUpdateListener()
      .subscribe((studentData: { students: User[]; studentCount: number }) => {
        this.isLoading = false;
        this.totalStudents = studentData.studentCount;
        this.students = studentData.students;
      });
  }

  test() {
    this.getStudents(this.form.value.search);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.studentPerPage = pageData.pageSize;
    this.studentService.getStudents(this.studentPerPage, this.currentPage, "");
  }

  deleteStudent(studentId: string) {
    console.log(studentId);
    this.studentService.deleteStudent(studentId).subscribe(() => {
      this.isLoading = true;
      this.studentService.getStudents(
        this.studentPerPage,
        this.currentPage,
        ""
      );
    });
  }

  addStudent() {
    this.router.navigate(["/ecms/add-student"]);
  }

  ngOnDestroy() {
    this.studentsSub.unsubscribe();
  }
}
