import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Book } from "src/app/shared/models/Book";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { bookService } from "src/app/shared/services/book.service";
import { mimeType } from "../add-product/mime-type.validator";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.scss"],
})
export class AddBookComponent implements OnInit {
  book: Book;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private bookId: string;

  constructor(
    public booksService: bookService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      auther: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      pages: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      copies: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("bookId")) {
        this.mode = "edit";
        this.bookId = paramMap.get("bookId");
        this.isLoading = true;
        this.booksService.getBook(this.bookId).subscribe((bookData) => {
          this.isLoading = false;
          this.book = {
            id: bookData._id,
            title: bookData.title,
            auther: bookData.auther,
            pages: bookData.pages,
            copies: bookData.copies,
            description: bookData.description,
            imagePath: bookData.imagePath,
          };
          this.form.setValue({
            title: this.book.title,
            auther: this.book.auther,
            pages: this.book.pages,
            copies: this.book.copies,
            description: this.book.description,
            image: this.book.imagePath,
          });
        });
      } else {
        this.mode = "create";
        this.bookId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveBook() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
    this.isLoading = true;
    if (this.mode === "create") {
      this.booksService.addBook(
        this.form.value.title,
        this.form.value.auther,
        this.form.value.pages,
        this.form.value.copies,
        this.form.value.description,
        this.form.value.image
      );
    } else {
      this.booksService.updateBook(
        this.bookId,
        this.form.value.title,
        this.form.value.auther,
        this.form.value.pages,
        this.form.value.copies,
        this.form.value.description,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  cancelForm() {
    this.form.reset();
    this.router.navigate(["/ecms/books"]);
  }
}
