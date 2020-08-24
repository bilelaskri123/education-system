import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";
import { User } from "src/app/shared/models/User";
import { LibrarianService } from "src/app/shared/services/librarian.service";

@Component({
  selector: "app-add-librarian",
  templateUrl: "./add-librarian.component.html",
  styleUrls: ["./add-librarian.component.scss"],
})
export class AddLibrarianComponent implements OnInit {
  hide = true;
  isLoading = false;
  private role: string = "librarian";
  accountant: User;

  constructor(
    private librarianService: LibrarianService,
    private router: Router
  ) {}

  ngOnInit() {}

  addLibrarian(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.librarianService.addLibrarian(
      form.value.fullName,
      form.value.email,
      form.value.password,
      this.role,
      form.value.salary
    );

    form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/librarians"]);
  }
}
