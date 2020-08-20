import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-teacher",
  templateUrl: "./add-teacher.component.html",
  styleUrls: ["./add-teacher.component.scss"],
})
export class AddTeacherComponent implements OnInit {
  hide = true;
  isLoading = false;
  private role: string = "teacher";
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  addTeacher(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService
      .createUser(
        form.value.fullName,
        form.value.email,
        form.value.password,
        this.role
      )
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/ecms/teachers"]);
      });
  }

  cancelForm() {
    this.router.navigate(["/ecms/teachers"]);
  }
}
