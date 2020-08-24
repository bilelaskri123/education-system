import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { AccountantService } from "src/app/shared/services/accountant.service";
import { TeacherService } from "src/app/shared/services/teacher.service";

@Component({
  selector: "app-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.scss"],
})
export class TeachersComponent implements OnInit, OnDestroy {
  teachers: User[] = [];
  isLoading = false;
  private teachersSub: Subscription;

  totalTeachers = 0;
  teacherPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private teacherService: TeacherService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.teacherService.getTeachers(this.teacherPerPage, this.currentPage);
    this.teachersSub = this.teacherService
      .getTeacherUpdateListener()
      .subscribe((teacherData: { teachers: User[]; teacherCount: number }) => {
        this.isLoading = false;
        this.totalTeachers = teacherData.teacherCount;
        this.teachers = teacherData.teachers;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.teacherPerPage = pageData.pageSize;
    this.teacherService.getTeachers(this.teacherPerPage, this.currentPage);
  }

  deleteTeacher(teacherId: string) {
    this.teacherService.deleteTeacher(teacherId).subscribe(() => {
      this.isLoading = true;
      this.teacherService.getTeachers(this.teacherPerPage, this.currentPage);
    });
  }

  addTeacher() {
    this.router.navigate(["/ecms/add-teacher"]);
  }

  ngOnDestroy() {
    this.teachersSub.unsubscribe();
  }
}
