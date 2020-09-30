import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Group } from "src/app/shared/models/Group";
import { Section } from "src/app/shared/models/Section";
import { GroupService } from "src/app/shared/services/group.service";
import { ProgramService } from "src/app/shared/services/program.service";
import { SectionService } from "src/app/shared/services/section.service";

@Component({
  selector: "app-evaluation",
  templateUrl: "./evaluation.component.html",
  styleUrls: ["./evaluation.component.scss"],
})
export class EvaluationComponent implements OnInit {
  isLoading = false;
  sections: Section[] = [];
  groups: Group[] = [];
  selectGroups = [];
  private sectionSub: Subscription;
  private groupSub: Subscription;
  lessons: any;
  form: FormGroup;
  students = [];

  constructor(
    private sectionService: SectionService,
    private groupService: GroupService,
    private programService: ProgramService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.sectionService.getSections(1000, 1);
    this.sectionSub = this.sectionService
      .getSectionUpdateListener()
      .subscribe(
        (sectionData: { sections: Section[]; sectionCount: number }) => {
          this.isLoading = false;
          this.sections = sectionData.sections;
        }
      );

    this.groupService.getGroups(1000, 1);
    this.groupSub = this.groupService
      .getGroupUpdateListener()
      .subscribe((groupData: { groups: Group[]; groupCount: number }) => {
        this.isLoading = false;
        this.groups = groupData.groups;
      });

    this.programService.getAllSubject().subscribe((lessons) => {
      this.lessons = lessons;
      // console.log(this.lessons);
    });

    this.form = new FormGroup({
      group: new FormControl(null, { validators: [Validators.required] }),
      course: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    let myFormValueCahnges = this.form.controls["group"].valueChanges;
    myFormValueCahnges.subscribe((data) => {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i].id == data) {
          this.selectGroups = this.groups[i].students;
        }
      }
    });
  }

  onSaveEvaluation() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
}
