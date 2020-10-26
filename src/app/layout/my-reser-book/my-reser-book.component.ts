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
  public reservation: any;
  role: string;
  isLoading = false;
  constructor(
    private reservationBookService: ReservationBookService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.reservationBookService.getMyReservation().subscribe((data) => {
      this.reservation = data;
    });

    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
  }
}
