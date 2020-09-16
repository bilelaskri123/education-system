import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  role: string;
  fullName: string;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.role = this.authService.getRole();
    this.fullName = this.authService.getFullName();
  }
}
