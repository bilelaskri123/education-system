import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Reservation } from "src/app/shared/models/Reservation";
import { Subscription } from "rxjs";
import { ReservationProductService } from "src/app/shared/services/reservationProduct.service";
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "src/app/shared/services/auth.service";
import { DataTable } from "./dataTable";

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

  role: string;
  settings = {};

  constructor(
    private reservationProductService: ReservationProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setRole();
  }

  getReservations() {
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

  setRole() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
      console.log(this.role);
      let datatable = new DataTable();
      if (detail.role == "admin") {
        this.settings = datatable.settings_for_admin;
        this.getReservations();
      } else {
        this.settings = datatable.settings_for_users;
        this.getReservations();
      }
    });
  }

  onCustom(event) {
    if (event.action == "delete") {
      if (
        confirm("are you sure to delete reservation of " + event.data.product)
      ) {
        this.reservationProductService
          .deleteReservation(event.data.id)
          .subscribe(() => {
            this.isLoading = true;
            this.reservationProductService.getReservations(
              this.reservationPerPage,
              this.currentPage
            );
          });
      }
    }
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
    });
  }
}
