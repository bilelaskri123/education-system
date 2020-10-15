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
  librarians: User[];
  librarianSub: Subscription;

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
    private librarianService: LibrarianService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getLibrarians();
  }

  getLibrarians() {
    this.librarianService.getLibrarians();
    this.librarianSub = this.librarianService
      .getLibrarianUpdateListener()
      .subscribe(
        (librarianData: { librarians: User[]; librarianCount: number }) => {
          this.isLoading = false;
          this.librarians = librarianData.librarians;
        }
      );
  }

  ngOnDestroy() {
    this.librarianSub.unsubscribe();
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-librarian/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.fullName)) {
        this.librarianService.deleteLibrarian(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.librarianService.getLibrarians();
        })
      }
    }
  }

  // deleteLibrarian(accountantId: string) {
  //   this.librarianService.deleteLibrarian(accountantId).subscribe(() => {
  //     this.isLoading = true;
  //     this.librarianService.getLibrarians(
  //       this.librarianPerPage,
  //       this.currentPage,
  //       ""
  //     );
  //   });
  // }

  addLibrarian() {
    this.router.navigate(["/ecms/add-librarian"]);
  }
}
