import { Injectable } from "@angular/core";
import { Book } from "../models/Book";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class bookService {
  private books: Book[] = [];
  private booksUpdated = new Subject<{ books: Book[]; bookCount: number }>();
  constructor(private http: HttpClient, private router: Router) {}

  getBooks() {
    // booksPerPage: number, currentPage: number, filtredBy: string
    // const queryParams = `?pagesize=${booksPerPage}&page=${currentPage}&search=${filtredBy}`;
    this.http
      .get<{ message: string; books: any; maxBooks: number }>(
        "http://localhost:3000/api/book" 
      )
      .pipe(
        map((bookData) => {
          return {
            books: bookData.books.map((book) => {
              return {
                title: book.title,
                auther: book.auther,
                isbn: book.isbn,
                pages: book.pages,
                copies: book.copies,
                description: book.description,
                id: book._id,
                imagePath: book.imagePath,
              };
            }),
            maxBooks: bookData.maxBooks,
          };
        })
      )
      .subscribe((transformedBooksData) => {
        this.books = transformedBooksData.books;
        this.booksUpdated.next({
          books: [...this.books],
          bookCount: transformedBooksData.maxBooks,
        });
      });
  }

  getBookUpdateListener() {
    return this.booksUpdated.asObservable();
  }

  getBook(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      isbn: string;
      auther: string;
      pages: number;
      copies: number;
      description: string;
      imagePath: string;
    }>("http://localhost:3000/api/book/" + id);
  }

  addBook(
    title: string,
    isbn: string,
    auther: string,
    pages: number,
    copies: number,
    description: string,
    image: File
  ) {
    const bookData = new FormData();
    let pagesUpdated = pages.toString();
    let copiesUpdated = copies.toString();

    bookData.append("title", title);
    bookData.append("isbn", isbn);
    bookData.append("auther", auther);
    bookData.append("pages", pagesUpdated);
    bookData.append("copies", copiesUpdated);
    bookData.append("description", description);
    bookData.append("image", image, title);

    this.http
      .post<{ message: string; book: Book }>(
        "http://localhost:3000/api/book",
        bookData
      )
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/books"]);
      });
  }

  updateBook(
    id: string,
    title: string,
    isbn: string,
    auther: string,
    pages: number,
    copies: number,
    description: string,
    image: File | string
  ) {
    let bookData: Book | FormData;
    if (typeof image === "object") {
      let pagesUpdated = pages.toString();
      let copiesUpdated = copies.toString();
      bookData = new FormData();
      bookData.append("title", title);
      bookData.append("isbn", isbn);
      bookData.append("auther", auther);
      bookData.append("pages", pagesUpdated);
      bookData.append("copies", copiesUpdated);
      bookData.append("description", description);
      bookData.append("image", image, title);
    } else {
      bookData = {
        id: id,
        title: title,
        isbn: isbn,
        auther: auther,
        pages: pages,
        copies: copies,
        description: description,
        imagePath: image,
      };
    }
    this.http
      .put("http://localhost:3000/api/book/" + id, bookData)
      .subscribe((response) => {
        this.router.navigate(["/ecms/books"]);
      });
  }

  deleteBook(bookId: string) {
    return this.http.delete("http://localhost:3000/api/book/" + bookId);
  }
}
