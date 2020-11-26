import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Attandance } from "src/app/shared/models/Attandance";
import { Group } from "src/app/shared/models/Group";
import { Program } from "src/app/shared/models/Program";
import { Section } from "src/app/shared/models/Section";
import { AttandanceService } from "src/app/shared/services/attandance.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { GroupService } from "src/app/shared/services/group.service";
import { ProgramService } from "src/app/shared/services/program.service";
import { SectionService } from "src/app/shared/services/section.service";
import { SettingService } from "src/app/shared/services/setting.service";

@Component({
  selector: "app-attendance",
  templateUrl: "./attendance.component.html",
  styleUrls: ["./attendance.component.scss"],
})
export class AttendanceComponent implements OnInit, OnDestroy {
  isLoading = false;
  role: string;
  totalAttandances = 0;
  attandancePerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  private attandanceSub: Subscription;
  attandances: Attandance[] = [];
  selectedAttandance: Attandance;

  sections: Section[] = [];
  private sectionSub: Subscription;

  groups: Group[] = [];
  selectedGroups: Group[] = [];
  group: Group;
  private groupSub: Subscription;

  private programsSub: Subscription;
  programs: Program[] = [];
  selectedLessons = [];

  sectionSearch: string;
  groupSearch: string;
  lessonSearch: string;
  constructor(
    private attandanceService: AttandanceService,
    private settingService: SettingService,
    private sectionService: SectionService,
    private groupService: GroupService,
    private programService: ProgramService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAttandances("", "", "");
    this.getSections();
    this.getGroups();
    this.getPrograms();
    this.getRole();
  }

  getRole() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
  }

  getAttandances(section: string, group: string, lesson: string) {
    this.attandanceService.getAttandances(
      this.attandancePerPage,
      this.currentPage,
      section,
      group,
      lesson
    );

    this.attandanceSub = this.attandanceService
      .getEvaluationUpdateListener()
      .subscribe(
        (attandanceData: {
          attandances: Attandance[];
          attandanceCount: number;
        }) => {
          this.isLoading = false;
          this.totalAttandances = attandanceData.attandanceCount;
          this.attandances = attandanceData.attandances;
        }
      );
  }

  getSections() {
    this.sectionService.getSections(1000, 1);
    this.sectionSub = this.sectionService
      .getSectionUpdateListener()
      .subscribe(
        (sectionData: { sections: Section[]; sectionCount: number }) => {
          this.sections = sectionData.sections;
        }
      );
  }

  getGroups() {
    this.groupService.getGroups(1000, 1);
    this.groupSub = this.groupService
      .getGroupUpdateListener()
      .subscribe((groupData: { groups: Group[]; groupCount: number }) => {
        this.groups = groupData.groups;
      });
  }

  getPrograms() {
    this.programService.getPrograms(1000, 1);
    this.programsSub = this.programService
      .getProgramUpdateListener()
      .subscribe(
        (programData: { programs: Program[]; programCount: number }) => {
          this.programs = programData.programs;
        }
      );
  }

  getSection(obj) {
    this.sectionSearch = obj.value;
    this.groupSearch = "";
    this.lessonSearch = "";
    this.selectedGroups = [];
    this.selectedLessons = [];
    this.groups.map((group) => {
      if (group.section._id == obj.value) {
        this.selectedGroups.push(group);
      }
    });
    this.getAttandances(
      this.sectionSearch,
      this.groupSearch,
      this.lessonSearch
    );
  }

  getGroup(obj) {
    this.groupSearch = obj.value;
    this.lessonSearch = "";
    this.selectedGroups.map((group) => {
      if (group.id == obj.value) {
        this.group = group;
      }
    });
    this.programs.map((program) => {
      if (
        program.section == this.group.section.name &&
        program.level == this.group.level
      ) {
        this.selectedLessons = program.lessons;
      }
    });
    this.getAttandances(
      this.sectionSearch,
      this.groupSearch,
      this.lessonSearch
    );
  }

  getLesson(obj) {
    this.lessonSearch = obj.value;
    this.getAttandances(
      this.sectionSearch,
      this.groupSearch,
      this.lessonSearch
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.attandancePerPage = pageData.pageSize;
    this.attandanceService.getAttandances(
      this.attandancePerPage,
      this.currentPage,
      "",
      "",
      ""
    );
  }

  getPaginator() {
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.attandancePerPage = setting.paginator;
      this.attandanceService.getAttandances(
        setting.paginator,
        this.currentPage,
        "",
        "",
        ""
      );
    });
  }

  newAttandance() {
    this.router.navigate(["/ecms/new-attandance"]);
  }

  ngOnDestroy() {
    this.attandanceSub.unsubscribe();
  }

  onDelete(id: string) {}

  selectAttandance(selectedAttandance) {
    this.selectedAttandance = selectedAttandance;
  }
}
