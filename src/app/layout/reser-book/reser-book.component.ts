import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ReservationBookService } from "src/app/shared/services/reservationBook.service";
import { Reservation } from "src/app/shared/models/Reservation";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-reser-book",
  templateUrl: "./reser-book.component.html",
  styleUrls: ["./reser-book.component.scss"],
})
export class ReserBookComponent implements OnInit, OnDestroy {
  reservations: Reservation[] = [];
  isLoading = false;
  private reservationsSub: Subscription;

  totalReservations = 0;
  reservationPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(
    private reservationBookService: ReservationBookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.reservationBookService.getReservations(
      this.reservationPerPage,
      this.currentPage
    );
    this.reservationsSub = this.reservationBookService
      .getReservationUpdateListener()
      .subscribe(
        (reservationData: { reservations: Reservation[]; count: number }) => {
          this.isLoading = false;
          this.totalReservations = reservationData.count;
          this.reservations = reservationData.reservations;
        }
      );
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.reservationPerPage = pageData.pageSize;
    this.reservationBookService.getReservations(
      this.reservationPerPage,
      this.currentPage
    );
  }

  deleteReservation(id: string) {
    this.reservationBookService.deleteReservation(id).subscribe(() => {
      this.isLoading = true;
      this.reservationBookService.getReservations(
        this.reservationPerPage,
        this.currentPage
      );
    });
  }

  newReservation() {
    this.router.navigate(["/ecms/new-reservation-book"]);
  }

  ngOnDestroy() {
    this.reservationsSub.unsubscribe();
  }
}
