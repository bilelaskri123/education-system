import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { bookService } from "src/app/shared/services/book.service";

@Component({
  selector: "app-my-reser-book",
  templateUrl: "./my-reser-book.component.html",
  styleUrls: ["./my-reser-book.component.scss"],
})
export class MyReserBookComponent implements OnInit {
  userId: string;
  reservation: any;
  constructor(
    private authService: AuthService,
    private bookService: bookService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    console.log(this.userId);
    this.bookService.getMyReservation(this.userId).subscribe((data) => {
      this.reservation = data;
      console.log(this.reservation);
    });
  }
}
