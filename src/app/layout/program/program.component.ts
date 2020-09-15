import { Component, OnDestroy, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Program } from "src/app/shared/models/Program";
import { ProgramService } from "src/app/shared/services/program.service";

@Component({
  selector: "app-program",
  templateUrl: "./program.component.html",
  styleUrls: ["./program.component.scss"],
})
export class ProgramComponent implements OnInit, OnDestroy {
  isLoading = false;
  private programsSub: Subscription;

  programs: Program[] = [];
  totalPrograms = 0;
  programPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(private router: Router, private programService: ProgramService) {}

  ngOnInit() {
    this.isLoading = true;
    this.programService.getPrograms(this.programPerPage, this.currentPage);
    this.programsSub = this.programService
      .getProgramUpdateListener()
      .subscribe(
        (programData: { programs: Program[]; programCount: number }) => {
          this.isLoading = false;
          this.totalPrograms = programData.programCount;
          this.programs = programData.programs;
        }
      );
  }

  newProgram() {
    this.router.navigate(["/ecms/new-program"]);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.programPerPage = pageData.pageSize;
    this.programService.getPrograms(this.programPerPage, this.currentPage);
  }

  onDelete(programId: string) {
    this.programService.deleteProgram(programId).subscribe(() => {
      this.isLoading = true;
      this.programService.getPrograms(this.programPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.programsSub.unsubscribe();
  }
}
