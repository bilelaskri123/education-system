import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Attandance } from "src/app/shared/models/Attandance";
import { AttandanceService } from "src/app/shared/services/attandance.service";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-attendance-detail",
  templateUrl: "./attendance-detail.component.html",
  styleUrls: ["./attendance-detail.component.scss"],
})
export class AttendanceDetailComponent implements OnInit {
  @Input() attandance: Attandance;
  role: string;

  constructor(
    private attandanceService: AttandanceService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAuth();
  }

  getAuth() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
  }

  onDelete(id: string) {
    this.attandanceService.deleteAttandance(id).subscribe((message) => {
      this.router.navigate(["/ecms/attendance"]);
    });
  }
}
