import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AccountantService } from "src/app/shared/services/accountant.service";
import { User } from "src/app/shared/models/User";

@Component({
  selector: "app-add-accountant",
  templateUrl: "./add-accountant.component.html",
  styleUrls: ["./add-accountant.component.scss"],
})
export class AddAccountantComponent implements OnInit {
  hide = true;
  isLoading = false;
  accountant: User;
  private role: string = "accountant";
  constructor(
    private accountantService: AccountantService,
    private router: Router
  ) {}

  ngOnInit() {}

  addAccountant(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.accountantService.addAccountant(
      form.value.fullName,
      form.value.email,
      form.value.password,
      this.role,
      form.value.salary
    );

    form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/accountant"]);
  }
}
