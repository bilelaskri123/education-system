import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "src/app/shared/models/Book";
import { bookService } from "src/app/shared/services/book.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { SettingService } from 'src/app/shared/services/setting.service';

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

  totalBooks = 0;
  bookPerPage = 0;
  currentPage = 1;
  pageSizeOptions = [1,2,5,10]


  constructor(public bookservice: bookService,
    private settingService: SettingService,
    private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.getBooks("");
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

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-book/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.title)) {
        this.bookservice.deleteBook(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.bookservice.getBooks(this.bookPerPage, this.currentPage, "");
        })
      }
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.bookPerPage = pageData.pageSize;
    this.bookservice.getBooks(this.bookPerPage, this.currentPage,"");
  }

  getPaginator(){
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.bookPerPage = setting.paginator;
      this.bookservice.getBooks(setting.paginator, this.currentPage,"");
    })
  }


  ngOnDestroy() {
    this.booksSub.unsubscribe();
  }
}
