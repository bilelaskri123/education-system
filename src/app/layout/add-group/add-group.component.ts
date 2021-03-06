import { Component, OnInit } from "@angular/core";
import { Section } from "src/app/shared/models/Section";
import { Subscription } from "rxjs";
import { SectionService } from "src/app/shared/services/section.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { GroupService } from "src/app/shared/services/group.service";

@Component({
  selector: "app-add-group",
  templateUrl: "./add-group.component.html",
  styleUrls: ["./add-group.component.scss"],
})
export class AddGroupComponent implements OnInit {
  isLoading = false;
  sections: Section[] = [];
  private sectionSub: Subscription;

  constructor(
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
        }
      );
  }

  addGroup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.groupService.addGroup(form.value.name, form.value.section, form.value.level);
  }

  cancelForm() {
    this.router.navigate(["/ecms/group"]);
  }
}
