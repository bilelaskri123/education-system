import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.scss"],
})
export class StudentComponent implements OnInit {
  students: any;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {}

  addStudent() {
    this.router.navigate(["/ecms/add-student"]);
  }
}
