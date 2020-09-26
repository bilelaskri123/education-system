import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Lesson } from "src/app/shared/models/Lesson";
import { AuthService } from "src/app/shared/services/auth.service";
import { SubjectService } from "src/app/shared/services/subject.service";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.scss"],
})
export class SubjectComponent implements OnInit, OnDestroy {
  role: string;
  lessons: Lesson[] = [];
  isLoading = false;
  private subjectsSub: Subscription;

  totalSubjects = 0;
  subjectPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(
    private router: Router,
    private subjectService: SubjectService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
    this.isLoading = true;
    this.subjectService.getSubjects(this.subjectPerPage, this.currentPage);
    this.subjectsSub = this.subjectService
      .getSubjectUpdateListener()
      .subscribe(
        (subjectData: { subjects: Lesson[]; subjectsCount: number }) => {
          this.isLoading = false;
          this.totalSubjects = subjectData.subjectsCount;
          this.lessons = subjectData.subjects;
        }
      );
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.subjectPerPage = pageData.pageSize;
    this.subjectService.getSubjects(this.subjectPerPage, this.currentPage);
  }

  onDelete(productId: string) {
    this.subjectService.deleteSubject(productId).subscribe(() => {
      this.isLoading = true;
      this.subjectService.getSubjects(this.subjectPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.subjectsSub.unsubscribe();
  }

  addSubject() {
    this.router.navigate(["/ecms/add-subject"]);
  }
  addCourse(id: string) {
    this.router.navigate(["/ecms/new-course/" + id]);
  }
}
