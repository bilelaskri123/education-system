import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { StudentService } from "src/app/shared/services/student.service";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentComponent implements OnInit, OnDestroy {
  isLoading = false;

  students: User[] = [];
  private studentsSub: Subscription;

  totalStudents = 0;
  studentPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(private studentService: StudentService, private router: Router) {}
  ngOnInit() {
    this.isLoading = true;
    this.studentService.getStudents(this.studentPerPage, this.currentPage);
    this.studentsSub = this.studentService
      .getStudentUpdateListener()
      .subscribe((studentData: { students: User[]; studentCount: number }) => {
        this.isLoading = false;
        this.totalStudents = studentData.studentCount;
        this.students = studentData.students;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.studentPerPage = pageData.pageSize;
    this.studentService.getStudents(this.studentPerPage, this.currentPage);
  }

  deleteTeacher(studentId: string) {
    this.studentService.deleteStudent(studentId).subscribe(() => {
      this.isLoading = true;
      this.studentService.getStudents(this.studentPerPage, this.currentPage);
    });
  }

  addStudent() {
    this.router.navigate(["/ecms/add-student"]);
  }

  ngOnDestroy() {
    this.studentsSub.unsubscribe();
  }
}
