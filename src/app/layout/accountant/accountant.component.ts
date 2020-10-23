import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";

import { Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { AccountantService } from "src/app/shared/services/accountant.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SettingService } from 'src/app/shared/services/setting.service';

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

  totalAccountants = 0;
  accountantsPerPage = 0;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(
    private accountantService: AccountantService,
    private settingService: SettingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getAccountants("");
    this.getPaginator();
  }

  getAccountants(filter: string) {
    this.accountantService.getAccountants(this.accountantsPerPage, this.currentPage, filter);
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

  accountantFilter(serach: string) {
    this.getAccountants(serach);
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-accountant/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.fullName)) {
        this.accountantService.deleteAccountant(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.accountantService.getAccountants(this.accountantsPerPage, this.currentPage, "");
        })
      }
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.accountantsPerPage = pageData.pageSize;
    this.accountantService.getAccountants(this.accountantsPerPage, this.currentPage,"");
  }

  getPaginator(){
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.accountantsPerPage = setting.paginator;
      this.accountantService.getAccountants(setting.paginator, this.currentPage,"");
    })
  }

  addAccountant() {
    this.router.navigate(["/ecms/add-accountant"]);
  }

  ngOnDestroy() {
    this.accountantsSub.unsubscribe();
  }
}
