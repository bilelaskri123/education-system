import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { bookService } from "src/app/shared/services/book.service";
import { ReservationBookService } from "src/app/shared/services/reservationBook.service";

@Component({
  selector: "app-my-reser-book",
  templateUrl: "./my-reser-book.component.html",
  styleUrls: ["./my-reser-book.component.scss"],
})
export class MyReserBookComponent implements OnInit {
  reservation: any;
  constructor(private reservationBookService: ReservationBookService) {}

  ngOnInit() {
    this.reservationBookService.getMyReservation().subscribe((data) => {
      this.reservation = data;
    });
  }
}
