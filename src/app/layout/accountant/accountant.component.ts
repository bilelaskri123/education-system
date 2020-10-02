import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";

import { Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { AccountantService } from "src/app/shared/services/accountant.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-accountant",
  templateUrl: "./accountant.component.html",
  styleUrls: ["./accountant.component.scss"],
})
export class AccountantComponent implements OnInit, OnDestroy {
  accountants: User[] = [];
  isLoading = false;
  form: FormGroup;
  private accountantsSub: Subscription;

  totalAccountants = 0;
  accountantPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(
    private accountantService: AccountantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.form = new FormGroup({
      search: new FormControl(null, { validators: [Validators.nullValidator] }),
    });
    this.getAccountants("");
  }

  getAccountants(filtredBy: string) {
    this.accountantService.getAccountants(
      this.accountantPerPage,
      this.currentPage,
      filtredBy
    );
    this.accountantsSub = this.accountantService
      .getAccountantUpdateListener()
      .subscribe(
        (accountantData: { accountants: User[]; accountantCount: number }) => {
          this.isLoading = false;
          this.totalAccountants = accountantData.accountantCount;
          this.accountants = accountantData.accountants;
        }
      );
  }

  test() {
    this.getAccountants(this.form.value.search);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.accountantPerPage = pageData.pageSize;
    this.accountantService.getAccountants(
      this.accountantPerPage,
      this.currentPage,
      ""
    );
  }

  deleteAccountant(accountantId: string) {
    this.accountantService.deleteAccountant(accountantId).subscribe(() => {
      this.isLoading = true;
      this.accountantService.getAccountants(
        this.accountantPerPage,
        this.currentPage,
        ""
      );
    });
  }

  addAccountant() {
    this.router.navigate(["/ecms/add-accountant"]);
  }

  ngOnDestroy() {
    this.accountantsSub.unsubscribe();
  }
}
