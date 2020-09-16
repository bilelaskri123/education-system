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
  public sidebarOpened = false;
  public fullName: string;
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
    this.fullName = this.authService.getFullName();
    console.log(this.fullName);
  }
}
