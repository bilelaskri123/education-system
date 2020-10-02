import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { AuthService } from "src/app/shared/services/auth.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { LibrarianService } from "src/app/shared/services/librarian.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-librarian",
  templateUrl: "./librarian.component.html",
  styleUrls: ["./librarian.component.scss"],
})
export class LibrarianComponent implements OnInit {
  isLoading = false;
  form: FormGroup;

  librarians: User[];
  librarianSub: Subscription;
  totalLibrarians = 0;
  librarianPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(
    private librarianService: LibrarianService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.form = new FormGroup({
      search: new FormControl(null, { validators: [Validators.nullValidator] }),
    });
    this.getLibrarians("");
  }

  getLibrarians(filtredBy: string) {
    this.librarianService.getLibrarians(
      this.librarianPerPage,
      this.currentPage,
      filtredBy
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

  test() {
    this.getLibrarians(this.form.value.search);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.librarianPerPage = pageData.pageSize;
    this.librarianService.getLibrarians(
      this.librarianPerPage,
      this.currentPage,
      ""
    );
  }

  ngOnDestroy() {
    this.librarianSub.unsubscribe();
  }

  deleteLibrarian(accountantId: string) {
    this.librarianService.deleteLibrarian(accountantId).subscribe(() => {
      this.isLoading = true;
      this.librarianService.getLibrarians(
        this.librarianPerPage,
        this.currentPage,
        ""
      );
    });
  }

  addLibrarian() {
    this.router.navigate(["/ecms/add-librarian"]);
  }
}
