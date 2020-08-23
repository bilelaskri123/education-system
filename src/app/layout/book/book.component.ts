import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "src/app/shared/models/Book";
import { bookService } from "src/app/shared/services/book.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  isLoading = false;
  private booksSub: Subscription;

  totalBooks = 0;
  bookPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public bookservice: bookService) {}

  ngOnInit() {
    this.isLoading = true;
    this.bookservice.getBooks(this.bookPerPage, this.currentPage);
    this.booksSub = this.bookservice
      .getBookUpdateListener()
      .subscribe((bookData: { books: Book[]; bookCount: number }) => {
        this.isLoading = false;
        this.totalBooks = bookData.bookCount;
        this.books = bookData.books;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.bookPerPage = pageData.pageSize;
    this.bookservice.getBooks(this.bookPerPage, this.currentPage);
  }

  onDelete(productId: string) {
    this.bookservice.deleteBook(productId).subscribe(() => {
      this.isLoading = true;
      this.bookservice.getBooks(this.bookPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }
}
