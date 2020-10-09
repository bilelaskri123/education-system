import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Reservation } from "src/app/shared/models/Reservation";
import { Subscription } from "rxjs";
import { ReservationProductService } from "src/app/shared/services/reservationProduct.service";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-reser-product",
  templateUrl: "./reser-product.component.html",
  styleUrls: ["./reser-product.component.scss"],
})
export class ReserProductComponent implements OnInit {
  reservations: Reservation[] = [];
  isLoading = false;
  private reservationsSub: Subscription;

  totalReservations = 0;
  reservationPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(
    private reservationProductService: ReservationProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.reservationProductService.getReservations(
      this.reservationPerPage,
      this.currentPage
    );
    this.reservationsSub = this.reservationProductService
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
    this.reservationProductService.getReservations(
      this.reservationPerPage,
      this.currentPage
    );
  }

  newReservation() {
    this.router.navigate(["/ecms/new-reservation-product"]);
  }

  deleteReservation(id: string) {
    this.reservationProductService.deleteReservation(id).subscribe(() => {
      this.isLoading = true;
      this.reservationProductService.getReservations(
        this.reservationPerPage,
        this.currentPage
      );
    })
  }
}
