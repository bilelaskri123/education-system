import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
import { StudentService } from "src/app/shared/services/student.service";
import { SectionService } from "src/app/shared/services/section.service";
import { GroupService } from "src/app/shared/services/group.service";
import { Subscription } from "rxjs";
import { Section } from "src/app/shared/models/Section";
import { Group } from "src/app/shared/models/Group";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"],
})
export class AddStudentComponent implements OnInit {
  hide = true;
  isLoading = false;
  private role: string = "student";

  public sectionSub: Subscription;
  public sections: Section[] = [];

  public groupSub: Subscription;
  public groups: Group[] = [];
  constructor(
    public studentService: StudentService,
    private sectionService: SectionService,
    private groupService: GroupService,
    private router: Router
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
          console.log(this.sections);
        }
      );

    this.groupService.getGroups(1000, 1);
    this.groupSub = this.groupService
      .getGroupUpdateListener()
      .subscribe((groupData: { groups: Group[]; groupCount: number }) => {
        this.isLoading = false;
        this.groups = groupData.groups;
      });
  }

  addStudent(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.studentService.addStudent(
      form.value.fullName,
      form.value.email,
      form.value.password,
      this.role,
      form.value.emailParent,
      form.value.section,
      form.value.group,
      form.value.payement
    );

    form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/students"]);
  }
}
