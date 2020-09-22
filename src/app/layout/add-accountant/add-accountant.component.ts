import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
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
  accountant: any;
  form: FormGroup;
  mode = "create";
  accountantId: string;
  private role: string = "accountant";
  constructor(
    private accountantService: AccountantService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      salary: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("accountantId")) {
        this.mode = "edit";
        this.form.get("password").clearValidators();
        this.accountantId = paramMap.get("accountantId");
        this.isLoading = true;
        this.accountantService
          .getAccountant(this.accountantId)
          .subscribe((accountantData) => {
            this.isLoading = false;
            this.accountant = {
              id: accountantData._id,
              fullName: accountantData.fullName,
              email: accountantData.email,
              salary: accountantData.salary,
            };
            this.form.patchValue({
              fullName: this.accountant.fullName,
              email: this.accountant.email,
              salary: this.accountant.salary,
            });
          });
      } else {
        this.mode = "create";
        this.accountantId = null;
      }
    });
  }

  onSaveAccountant() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.isLoading = true;
      this.accountantService.addAccountant(
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.password,
        this.role,
        this.form.value.salary
      );
    } else {
      this.accountantService.updateAccountant(
        this.accountantId,
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.salary
      );
    }

    this.form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/accountant"]);
  }
}
