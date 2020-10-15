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
  private accountantsSub: Subscription;

  settings = {
    columns : {
      fullName : {
        title: 'Full Name'
      },
      email : {
        title: 'Email'
      },
      salary : {
        title: 'Salary'
      },
    },
    actions: {
      custom : [
        {
          name: 'edit',
          title: '<i class="fas fa-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="far fa-trash-alt"></i>'
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    },
    attr: {
      class: 'table table-bordered'
    }
  }

  constructor(
    private accountantService: AccountantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getAccountants();
  }

  getAccountants() {
    this.accountantService.getAccountants();
    this.accountantsSub = this.accountantService
      .getAccountantUpdateListener()
      .subscribe(
        (accountantData: { accountants: User[]; accountantCount: number }) => {
          this.isLoading = false;
          this.accountants = accountantData.accountants;
        }
      );
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-accountant/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.fullName)) {
        this.accountantService.deleteAccountant(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.accountantService.getAccountants();
        })
      }
    }
  }

  deleteAccountant(accountantId: string) {
    this.accountantService.deleteAccountant(accountantId).subscribe(() => {
      this.isLoading = true;
      this.accountantService.getAccountants();
    });
  }

  addAccountant() {
    this.router.navigate(["/ecms/add-accountant"]);
  }

  ngOnDestroy() {
    this.accountantsSub.unsubscribe();
  }
}
