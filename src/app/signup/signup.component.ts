import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/services/auth.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  hide = true;
  isLoading = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  // onSignup(form: NgForm) {
  //   console.log(form.value);
  //   if (form.invalid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   this.authService
  //     .createUser(
  //       form.value.fullName,
  //       form.value.email,
  //       form.value.password,
  //       form.value.role
  //     )
  //     .subscribe((response) => {
  //       console.log(response);
  //       this.router.navigate(["/login"]);
  //     });
  // }

  onLogin() {
    this.router.navigate(["/login"]);
  }
}
