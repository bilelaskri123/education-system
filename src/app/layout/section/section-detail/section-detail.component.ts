import { Component, Input, OnInit } from "@angular/core";
import { Section } from "src/app/shared/models/Section";
import { AuthService } from "src/app/shared/services/auth.service";
import { SectionService } from "src/app/shared/services/section.service";

@Component({
  selector: "app-section-detail",
  templateUrl: "./section-detail.component.html",
  styleUrls: ["./section-detail.component.scss"],
})
export class SectionDetailComponent implements OnInit {
  @Input() section: Section;
  role: string;
  constructor(
    private sectionService: SectionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getAuth();
  }

  getAuth() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
  }

  onDelete(sectionId: string) {
    this.sectionService.deleteSection(sectionId).subscribe(() => {
      this.sectionService.getSections(5, 1);
    });
  }
}
