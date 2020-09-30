import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "src/app/shared/models/Book";
import { bookService } from "src/app/shared/services/book.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  isLoading = false;
  private booksSub: Subscription;

  form: FormGroup;

  totalBooks = 0;
  bookPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public bookservice: bookService) {}

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl(null, { validators: [Validators.nullValidator] }),
    });

    this.isLoading = true;
    this.getBooks("");
  }

  public getBooks(filtredBy: string) {
    console.log(filtredBy);
    this.bookservice.getBooks(this.bookPerPage, this.currentPage, filtredBy);
    this.booksSub = this.bookservice
      .getBookUpdateListener()
      .subscribe((bookData: { books: Book[]; bookCount: number }) => {
        this.isLoading = false;
        this.totalBooks = bookData.bookCount;
        this.books = bookData.books;
      });
  }

  test() {
    this.getBooks(this.form.value.search);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.bookPerPage = pageData.pageSize;
    this.bookservice.getBooks(
      this.bookPerPage,
      this.currentPage,
      this.form.value.search
    );
  }

  onDelete(productId: string) {
    this.bookservice.deleteBook(productId).subscribe(() => {
      this.isLoading = true;
      this.bookservice.getBooks(
        this.bookPerPage,
        this.currentPage,
        this.form.value.search
      );
    });
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }
}
