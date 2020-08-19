import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"],
})
export class AddStudentComponent implements OnInit {
  hide = true;
  isLoading = false;
  private role: string = "student";
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {}

  addStudent(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .createUser(
        form.value.fullName,
        form.value.email,
        form.value.password,
        this.role
      )
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/ecms/students"]);
      });
  }
}
