import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription } from "rxjs";
import { Reservation } from "src/app/shared/models/Reservation";
import { DataTable } from "./dataTable";
import { ReservationBookService } from "src/app/shared/services/reservationBook.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-demande-book",
  templateUrl: "./demande-book.component.html",
  styleUrls: ["./demande-book.component.scss"],
})
export class DemandeBookComponent implements OnInit {
  isLoading = false;
  demands: Reservation[] = [];
  settings = {};
  role: string;

  totalDemands = 0;
  demandPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private demandsSub: Subscription;

  constructor(
    private reservationBookService: ReservationBookService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setRole();
  }

  getDemands() {
    this.isLoading = true;
    this.reservationBookService.getDemands(
      this.demandPerPage,
      this.currentPage
    );
    this.demandsSub = this.reservationBookService
      .getDemandUpdatedListener()
      .subscribe(
        (reservationData: { demands: Reservation[]; count: number }) => {
          this.isLoading = false;
          this.totalDemands = reservationData.count;
          this.demands = reservationData.demands;
          console.log(this.demands);
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
        this.getDemands();
      } else {
        this.settings = datatable.settings_for_users;
        this.getDemands();
      }
    });
  }

  onCustom(event) {
    if (event.action == "accept") {
      this.reservationBookService.acceptReservation(event.data.id);
      this.reservationBookService.getDemands(
        this.demandPerPage,
        this.currentPage
      );
    } else if (event.action == "refuse") {
      this.reservationBookService.refuseReservation(event.data.id);
      this.reservationBookService.getDemands(
        this.demandPerPage,
        this.currentPage
      );
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.demandPerPage = pageData.pageSize;
    this.reservationBookService.getDemands(
      this.demandPerPage,
      this.currentPage
    );
  }
}
