import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header-book",
  templateUrl: "./header-book.component.html",
  styleUrls: ["./header-book.component.scss"],
})
export class HeaderBookComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  addBook() {
    this.router.navigate(["/ecms/create-book"]);
  }
}
