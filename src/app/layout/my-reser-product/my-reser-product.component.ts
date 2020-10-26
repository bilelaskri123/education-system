import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { ReservationProductService } from "src/app/shared/services/reservationProduct.service";

@Component({
  selector: "app-my-reser-product",
  templateUrl: "./my-reser-product.component.html",
  styleUrls: ["./my-reser-product.component.scss"],
})
export class MyReserProductComponent implements OnInit {
  reservation: any;
  role: string;
  isLoading = false;
  constructor(
    private reservationProductService: ReservationProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.reservationProductService.getMyReservation().subscribe((data) => {
      this.reservation = data;
    });

    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
    });
  }
}
