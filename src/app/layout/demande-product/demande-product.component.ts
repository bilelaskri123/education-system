import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Reservation } from "src/app/shared/models/Reservation";
import { AuthService } from "src/app/shared/services/auth.service";
import { ReservationProductService } from "src/app/shared/services/reservationProduct.service";
import { DataTable } from "./dataTable";

@Component({
  selector: "app-demande-product",
  templateUrl: "./demande-product.component.html",
  styleUrls: ["./demande-product.component.scss"],
})
export class DemandeProductComponent implements OnInit {
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
    private reservationProductService: ReservationProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setRole();
  }

  getDemands() {
    this.isLoading = true;
    this.reservationProductService.getDemands(
      this.demandPerPage,
      this.currentPage
    );
    this.demandsSub = this.reservationProductService
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
      this.reservationProductService.acceptReservation(event.data.id);
      this.reservationProductService.getDemands(
        this.demandPerPage,
        this.currentPage
      );
    } else if (event.action == "refuse") {
      this.reservationProductService.refuseReservation(event.data.id);
      this.reservationProductService.getDemands(
        this.demandPerPage,
        this.currentPage
      );
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.demandPerPage = pageData.pageSize;
    this.reservationProductService.getDemands(
      this.demandPerPage,
      this.currentPage
    );
  }
}
