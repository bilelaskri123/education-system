import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Section } from "src/app/shared/models/Section";
import { Subscription } from "rxjs";
import { SectionService } from "src/app/shared/services/section.service";
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-section",
  templateUrl: "./section.component.html",
  styleUrls: ["./section.component.scss"],
})
export class SectionComponent implements OnInit, OnDestroy {
  isLoading = false;
  role: string;
  sections: Section[] = [];
  selectedSection: Section;
  private sectionSub: Subscription;

  totalSections = 0;
  sectionPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(
    private router: Router,
    private sectionService: SectionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
    this.isLoading = true;
    this.sectionService.getSections(this.sectionPerPage, this.currentPage);
    this.sectionSub = this.sectionService
      .getSectionUpdateListener()
      .subscribe(
        (sectionData: { sections: Section[]; sectionCount: number }) => {
          this.isLoading = false;
          this.totalSections = sectionData.sectionCount;
          this.sections = sectionData.sections;
        }
      );
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.sectionPerPage = pageData.pageSize;
    this.sectionService.getSections(this.sectionPerPage, this.currentPage);
  }

  onDelete(sectionId: string) {
    this.sectionService.deleteSection(sectionId).subscribe(() => {
      this.isLoading = true;
      this.sectionService.getSections(this.sectionPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.sectionSub.unsubscribe();
  }

  addSection() {
    this.router.navigate(["/ecms/add-section"]);
  }

  selectSection(selectedSection) {
    this.selectedSection = selectedSection;
  }
}
