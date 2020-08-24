import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { SectionService } from "src/app/shared/services/section.service";
import { Section } from "src/app/shared/models/Section";
import { Subscription } from "rxjs";
import { TeacherService } from "src/app/shared/services/teacher.service";

@Component({
  selector: "app-add-teacher",
  templateUrl: "./add-teacher.component.html",
  styleUrls: ["./add-teacher.component.scss"],
})
export class AddTeacherComponent implements OnInit {
  hide = true;
  isLoading = false;
  private role: string = "teacher";

  private sectionSub: Subscription;
  public sections: Section[] = [];
  constructor(
    public teacherService: TeacherService,
    public sectionService: SectionService,
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
  }

  addTeacher(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.teacherService.addTeacher(
      form.value.fullName,
      form.value.email,
      form.value.password,
      form.value.speciality,
      form.value.salary,
      this.role
    );

    form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/teachers"]);
  }
}
