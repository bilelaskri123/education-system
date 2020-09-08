import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/shared/models/Book";
import { ReservationBookService } from "src/app/shared/services/reservationBook.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-reser-book",
  templateUrl: "./add-reser-book.component.html",
  styleUrls: ["./add-reser-book.component.scss"],
})
export class AddReserBookComponent implements OnInit {
  books: Book[] = [];
  users: any;
  constructor(private reservationBookService: ReservationBookService) {}

  ngOnInit() {
    this.reservationBookService.getFreeBooks().subscribe((books) => {
      this.books = books.books;
      console.log(this.books);
    });

    this.reservationBookService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
    });
  }

  newReservation(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.reservationBookService.newReservation(
      form.value.user,
      form.value.book
    );

    form.reset();
  }
}
