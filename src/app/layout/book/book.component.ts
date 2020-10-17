import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "src/app/shared/models/Book";
import { bookService } from "src/app/shared/services/book.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  isLoading = false;
  private booksSub: Subscription;

  // form: FormGroup;

  // totalBooks = 0;
  // bookPerPage = 5;
  // currentPage = 1;
  // pageSizeOptions = [1, 2, 5, 10];

  settings = {
    columns : {
      imagePath: {
        title: 'image',
        type: 'html',
        valuePrepareFunction:(imagePath: string) => {return `<img src="${imagePath}">`}
      },
      title : {
        title: 'Title'
      },
      isbn : {
        title: 'isbn'
      },
      auther : {
        title: 'Auther'
      },
      pages : {
        title: 'Pages'
      },
      copies : {
        title: 'Copies'
      },
      description: {
        title: 'Description'
      }
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


  constructor(public bookservice: bookService, private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.getBooks();
  }

  public getBooks() {
    this.bookservice.getBooks();
    this.booksSub = this.bookservice
      .getBookUpdateListener()
      .subscribe((bookData: { books: Book[]; bookCount: number }) => {
        this.isLoading = false;
        this.books = bookData.books;
      });
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-book/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.title)) {
        this.bookservice.deleteBook(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.bookservice.getBooks();
        })
      }
    }
  }

  // onDelete(productId: string) {
  //   this.bookservice.deleteBook(productId).subscribe(() => {
  //     this.isLoading = true;
  //     this.bookservice.getBooks(this.bookPerPage, this.currentPage, "");
  //   });
  // }

  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }
}
