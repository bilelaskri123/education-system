import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  user: any;
  role: string;
  fullName: string;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.userDetail().subscribe((user) => {
      this.user = user;
      this.fullName = this.user.fullName;
      this.role = this.user.role;
    });
  }
}
