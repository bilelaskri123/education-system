import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-librarian",
  templateUrl: "./add-librarian.component.html",
  styleUrls: ["./add-librarian.component.scss"],
})
export class AddLibrarianComponent implements OnInit {
  hide = true;
  isLoading = false;
  private role: string = "librarian";
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  addLibrarian(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService
      .createUser(
        form.value.fullName,
        form.value.email,
        form.value.password,
        this.role
      )
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(["/ecms/librarian"]);
      });
  }
}
