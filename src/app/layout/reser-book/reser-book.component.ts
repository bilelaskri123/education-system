import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ReservationBookService } from "src/app/shared/services/reservationBook.service";
import { Reservation } from "src/app/shared/models/Reservation";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { DataTable } from "./dataTable";
import { AuthService } from "src/app/shared/services/auth.service";

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

  role: string;
  settings = {};

  constructor(
    private reservationBookService: ReservationBookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setRole();
  }

  getReservations() {
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
      if (confirm("are you sure to delete reservation of " + event.data.book)) {
        this.reservationBookService
          .deleteReservation(event.data.id)
          .subscribe(() => {
            this.isLoading = true;
            this.reservationBookService.getReservations(
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
    this.reservationBookService.getReservations(
      this.reservationPerPage,
      this.currentPage
    );
  }

  // deleteReservation(id: string) {
  //   this.reservationBookService.deleteReservation(id).subscribe(() => {
  //     this.isLoading = true;
  //     this.reservationBookService.getReservations(
  //       this.reservationPerPage,
  //       this.currentPage
  //     );
  //   });
  // }

  newReservation() {
    this.router.navigate(["/ecms/new-reservation-book"]);
  }

  ngOnDestroy() {
    this.reservationsSub.unsubscribe();
  }
}
