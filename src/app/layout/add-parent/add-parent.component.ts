import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-parent",
  templateUrl: "./add-parent.component.html",
  styleUrls: ["./add-parent.component.scss"],
})
export class AddParentComponent implements OnInit {
  hide = true;
  isLoading = false;
  private role: string = "parent";
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}
}
