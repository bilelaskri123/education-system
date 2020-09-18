import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  title = "education system";
  constructor(public router: Router) {}
  ngOnInit() {}

  onLoggedin() {
    localStorage.setItem("isLoggedin", "true");
  }
}
