import { Component, OnInit } from "@angular/core";
import { ReservationProductService } from "src/app/shared/services/reservationProduct.service";

@Component({
  selector: "app-my-reser-product",
  templateUrl: "./my-reser-product.component.html",
  styleUrls: ["./my-reser-product.component.scss"],
})
export class MyReserProductComponent implements OnInit {
  reservation: any;
  constructor(private reservationProductService: ReservationProductService) {}

  ngOnInit() {
    this.reservationProductService.getMyReservation().subscribe((data) => {
      this.reservation = data;
    });
  }
}
