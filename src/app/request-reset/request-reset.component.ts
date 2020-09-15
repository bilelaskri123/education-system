import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ResetService } from "../shared/services/reset.service";

@Component({
  selector: "app-request-reset",
  templateUrl: "./request-reset.component.html",
  styleUrls: ["./request-reset.component.scss"],
})
export class RequestResetComponent implements OnInit {
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;
  constructor(private router: Router, private resetService: ResetService) {}

  ngOnInit() {
    this.RequestResetForm = new FormGroup({
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.forbiddenEmails
      ),
    });
  }

  RequestResetUser(form) {
    console.log(form);
    if (form.valid) {
      this.IsvalidForm = true;
      this.resetService.requestReset(this.RequestResetForm.value).subscribe(
        (data) => {
          this.RequestResetForm.reset();
          this.successMessage =
            "Reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(["login"]);
          }, 3000);
        },
        (err) => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}
