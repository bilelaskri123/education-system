import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/shared/models/Product";
import { ReservationProductService } from "src/app/shared/services/reservationProduct.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-reser-product",
  templateUrl: "./add-reser-product.component.html",
  styleUrls: ["./add-reser-product.component.scss"],
})
export class AddReserProductComponent implements OnInit {
  products: Product[] = [];
  users: any;
  constructor(private reservationProductService: ReservationProductService) {}

  ngOnInit() {
    this.reservationProductService.getFreeProducts().subscribe((products) => {
      this.products = products.products;
      console.log(this.products);
    });

    this.reservationProductService.getUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
    });
  }

  newReservation(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.reservationProductService.newReservation(
      form.value.user,
      form.value.product
    );

    form.reset();
  }
}
