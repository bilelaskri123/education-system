import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
  styleUrls: ["./subject.component.scss"],
})
export class SubjectComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  addSubject() {
    this.router.navigate(["/ecms/add-course"]);
  }
}
