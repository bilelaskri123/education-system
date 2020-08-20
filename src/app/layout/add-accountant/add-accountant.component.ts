import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, NgForm } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-accountant",
  templateUrl: "./add-accountant.component.html",
  styleUrls: ["./add-accountant.component.scss"],
})
export class AddAccountantComponent implements OnInit {
  hide = true;
  isLoading = false;
  private role: string = "accountant";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  addAccountant(form: NgForm) {
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
        this.router.navigate(["/ecms/accountant"]);
      });
  }
}
