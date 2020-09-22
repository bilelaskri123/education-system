import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
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
  librarian: any;
  form: FormGroup;
  private mode = "create";
  private librarianId: string;
  private role: string = "librarian";
  accountant: User;

  constructor(
    private librarianService: LibrarianService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4)],
      }),
      salary: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("librarianId")) {
        this.mode = "edit";
        this.form.get("password").clearValidators();
        this.librarianId = paramMap.get("librarianId");
        this.isLoading = true;
        this.librarianService
          .getLibrarian(this.librarianId)
          .subscribe((librarianData) => {
            console.log(librarianData);
            this.isLoading = false;
            this.librarian = {
              id: librarianData._id,
              fullName: librarianData.fullName,
              email: librarianData.email,
              salary: librarianData.salary,
            };
            this.form.patchValue({
              fullName: this.librarian.fullName,
              email: this.librarian.email,
              salary: this.librarian.salary,
            });
          });
      } else {
        this.mode = "create";
        this.librarianId = null;
      }
    });
  }

  onSaveLibrarian() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.isLoading = true;
      this.librarianService.addLibrarian(
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.password,
        this.role,
        this.form.value.salary
      );
    } else {
      console.log(this.form.value);
      this.librarianService.updateLibrarian(
        this.librarianId,
        this.form.value.fullName,
        this.form.value.email,
        this.form.value.salary
      );
    }

    this.form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/librarians"]);
  }
}
