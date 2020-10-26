import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "src/app/shared/models/Book";
import { bookService } from "src/app/shared/services/book.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { SettingService } from "src/app/shared/services/setting.service";
import { AuthService } from "../../shared/services/auth.service";
import { DataTable } from "./datatable";
@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  isLoading = false;
  private booksSub: Subscription;
  public settings = {};

  totalBooks = 0;
  bookPerPage = 0;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  role: string;

  constructor(
    public bookservice: bookService,
    private settingService: SettingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.setRole();
    this.getPaginator();
  }

  public getBooks(filter: string) {
    this.bookservice.getBooks(this.bookPerPage, this.currentPage, filter);
    this.booksSub = this.bookservice
      .getBookUpdateListener()
      .subscribe((bookData: { books: Book[]; bookCount: number }) => {
        this.isLoading = false;
        this.totalBooks = bookData.bookCount;
        this.books = bookData.books;
      });
  }

  bookFilter(filter: string) {
    this.getBooks(filter);
  }

  setRole() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
      console.log(this.role);
      let datatable = new DataTable();
      if (detail.role == "admin") {
        this.settings = datatable.settings_for_admin;
        this.getBooks("");
      } else {
        this.settings = datatable.settings_for_users;
        this.getBooks("");
      }
    });
  }

  onCustom(event) {
    if (event.action == "edit") {
      this.router.navigate(["/ecms/edit-book/" + event.data.id]);
    } else if (event.action == "delete") {
      if (confirm("are you sure to delete " + event.data.title)) {
        this.bookservice.deleteBook(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.bookservice.getBooks(this.bookPerPage, this.currentPage, "");
        });
      }
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.bookPerPage = pageData.pageSize;
    this.bookservice.getBooks(this.bookPerPage, this.currentPage, "");
  }

  getPaginator() {
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.bookPerPage = setting.paginator;
      this.bookservice.getBooks(setting.paginator, this.currentPage, "");
    });
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }
}
