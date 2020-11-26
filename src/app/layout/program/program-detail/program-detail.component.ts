import { Component, Input, OnInit } from "@angular/core";
import { Program } from "src/app/shared/models/Program";
import { AuthService } from "src/app/shared/services/auth.service";
import { ProgramService } from "src/app/shared/services/program.service";

@Component({
  selector: "app-program-detail",
  templateUrl: "./program-detail.component.html",
  styleUrls: ["./program-detail.component.scss"],
})
export class ProgramDetailComponent implements OnInit {
  @Input() program: Program;
  role: string;
  constructor(
    private programService: ProgramService,
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

  onDelete(programId: string) {
    this.programService.deleteProgram(programId).subscribe(() => {
      this.programService.getPrograms(5, 1);
    });
  }
}
