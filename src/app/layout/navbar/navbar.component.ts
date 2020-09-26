import { Component, OnInit } from "@angular/core";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  providers: [NgbDropdownConfig],
})
export class NavbarComponent implements OnInit {
  user: any;
  fullName: string;
  image: string;
  public sidebarOpened = false;
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector(".sidebar-offcanvas").classList.add("active");
    } else {
      document.querySelector(".sidebar-offcanvas").classList.remove("active");
    }
  }
  constructor(config: NgbDropdownConfig, private authService: AuthService) {
    config.placement = "bottom-right";
  }
  ngOnInit() {
    this.authService.userDetail().subscribe((user) => {
      this.user = user;
      this.fullName = this.user.fullName;
      this.image = this.user.image;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
