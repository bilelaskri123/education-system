import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-header-book",
  templateUrl: "./header-book.component.html",
  styleUrls: ["./header-book.component.scss"],
})
export class HeaderBookComponent implements OnInit {
  role: string;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
  }

  addBook() {
    this.router.navigate(["/ecms/create-book"]);
  }
}
