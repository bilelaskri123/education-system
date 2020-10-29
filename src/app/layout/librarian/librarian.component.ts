import { Component, OnDestroy, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { AuthService } from "src/app/shared/services/auth.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { LibrarianService } from "src/app/shared/services/librarian.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SettingService } from "src/app/shared/services/setting.service";

@Component({
  selector: "app-librarian",
  templateUrl: "./librarian.component.html",
  styleUrls: ["./librarian.component.scss"],
})
export class LibrarianComponent implements OnInit, OnDestroy {
  isLoading = false;
  librarians: User[];
  librarianSub: Subscription;

  settings = {
    columns: {
      fullName: {
        title: "Full Name",
      },
      email: {
        title: "Email",
      },
      salary: {
        title: "Salary",
      },
    },
    actions: {
      custom: [
        {
          name: "edit",
          title: '<i class="fas fa-edit"></i>',
        },
        {
          name: "delete",
          title: '<i class="far fa-trash-alt"></i>',
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: "right",
    },
    attr: {
      class: "table table-bordered",
    },
  };

  totalLibrarians = 0;
  librariansPerPage = 0;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  searchValue: string = "";

  constructor(
    private librarianService: LibrarianService,
    private settingService: SettingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    // this.getLibrarians("");
    this.librarianFilter("");
    this.getPaginator();
  }

  getLibrarians(filter: string) {
    this.librarianService.getLibrarians(
      this.librariansPerPage,
      this.currentPage,
      filter
    );
    this.librarianSub = this.librarianService
      .getLibrarianUpdateListener()
      .subscribe(
        (librarianData: { librarians: User[]; librarianCount: number }) => {
          this.isLoading = false;
          this.totalLibrarians = librarianData.librarianCount;
          this.librarians = librarianData.librarians;
        }
      );
  }

  librarianFilter(search: string) {
    this.getLibrarians(search);
    this.searchValue = search;
  }

  onCustom(event) {
    if (event.action == "edit") {
      this.router.navigate(["/ecms/edit-librarian/" + event.data.id]);
    } else if (event.action == "delete") {
      if (confirm("are you sure to delete " + event.data.fullName)) {
        this.librarianService.deleteLibrarian(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.librarianService.getLibrarians(
            this.librariansPerPage,
            this.currentPage,
            this.searchValue
          );
        });
      }
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.librariansPerPage = pageData.pageSize;
    this.librarianService.getLibrarians(
      this.librariansPerPage,
      this.currentPage,
      this.searchValue
    );
  }

  getPaginator() {
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.librariansPerPage = setting.paginator;
      this.librarianService.getLibrarians(
        setting.paginator,
        this.currentPage,
        this.searchValue
      );
    });
  }

  addLibrarian() {
    this.router.navigate(["/ecms/add-librarian"]);
  }

  ngOnDestroy() {
    this.librarianSub.unsubscribe();
  }
}
