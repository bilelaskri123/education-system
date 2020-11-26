import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Evaluation } from "src/app/shared/models/Evaluation";
import { Group } from "src/app/shared/models/Group";
import { Program } from "src/app/shared/models/Program";
import { Section } from "src/app/shared/models/Section";
import { AuthService } from "src/app/shared/services/auth.service";
import { EvaluationService } from "src/app/shared/services/evaluation.service";
import { GroupService } from "src/app/shared/services/group.service";
import { ProgramService } from "src/app/shared/services/program.service";
import { SectionService } from "src/app/shared/services/section.service";
import { SettingService } from "src/app/shared/services/setting.service";

@Component({
  selector: "app-evaluation",
  templateUrl: "./evaluation.component.html",
  styleUrls: ["./evaluation.component.scss"],
})
export class EvaluationComponent implements OnInit, OnDestroy {
  isLoading = false;
  role: string;
  totalEvaluations = 0;
  evaluationPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  private evaluationSub: Subscription;
  evaluations: Evaluation[] = [];
  selectedEvaluation: Evaluation;

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

  score: number;
  admis: number;

  messageDeleted: string = "";

  constructor(
    private evaluationService: EvaluationService,
    private settingService: SettingService,
    private sectionService: SectionService,
    private groupService: GroupService,
    private programService: ProgramService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEvaluations("", "", "");
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

  getEvaluations(section: string, group: string, lesson: string) {
    this.evaluationService.getEvaluations(
      this.evaluationPerPage,
      this.currentPage,
      section,
      group,
      lesson
    );

    this.evaluationSub = this.evaluationService
      .getEvaluationUpdateListener()
      .subscribe(
        (evaluationData: {
          evaluations: Evaluation[];
          evaluationCount: number;
        }) => {
          this.isLoading = false;
          this.totalEvaluations = evaluationData.evaluationCount;
          this.evaluations = evaluationData.evaluations;
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
    this.getEvaluations(
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
    this.getEvaluations(
      this.sectionSearch,
      this.groupSearch,
      this.lessonSearch
    );
  }

  getLesson(obj) {
    this.lessonSearch = obj.value;
    this.getEvaluations(
      this.sectionSearch,
      this.groupSearch,
      this.lessonSearch
    );
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.evaluationPerPage = pageData.pageSize;
    this.evaluationService.getEvaluations(
      this.evaluationPerPage,
      this.currentPage,
      "",
      "",
      ""
    );
  }

  getPaginator() {
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.evaluationPerPage = setting.paginator;
      this.score = setting.score;
      this.admis = setting.admis;
      this.evaluationService.getEvaluations(
        setting.paginator,
        this.currentPage,
        "",
        "",
        ""
      );
    });
  }

  onDelete(id: string) {
    this.evaluationService.deleteEvaluation(id).subscribe((message) => {
      this.messageDeleted = message.message;
      setTimeout(() => {
        this.messageDeleted = "";
      }, 2000);
    });
    this.getEvaluations("", "", "");
  }

  newEvaluation() {
    this.router.navigate(["/ecms/new-evaluation"]);
  }

  ngOnDestroy() {
    this.evaluationSub.unsubscribe();
  }

  selectEvaluation(selectedEvaluation) {
    this.selectedEvaluation = selectedEvaluation;
  }
}
