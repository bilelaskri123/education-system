import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Reservation } from "../models/Reservation";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReservationProductService {
  private reservations: Reservation[] = [];
  private reservationsUpdated = new Subject<{
    reservations: Reservation[];
    count: number;
  }>();
  constructor(private http: HttpClient, private router: Router) {}

  getUsers() {
    return this.http.get("http://localhost:3000/api/auth/users");
  }

  getFreeProducts() {
    return this.http
      .get<{ products: any }>("http://localhost:3000/api/product/free")
      .pipe(
        map((products) => {
          return {
            products: products.products.map((product) => {
              return {
                id: product._id,
                name: product.name,
                category: product.category,
                stock: product.stock,
                description: product.description,
                imagePath: product.imagePath,
              };
            }),
          };
        })
      );
  }

  newReservation(user: string, product: string) {
    let reserData = {
      user: user,
      product: product,
    };

    console.log(reserData);

    this.http
      .post<{ message: string }>(
        "http://localhost:3000/api/reserProduct",
        reserData
      )
      .subscribe((response) => {
        this.router.navigate(["/ecms/product-reservation"]);
      });
  }

  getReservations(reserPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${reserPerPage}&page=${currentPage}`;
    return this.http
      .get<{ message: string; reservations: any; count: number }>(
        "http://localhost:3000/api/reserProduct" + queryParams
      )
      .pipe(
        map((reserData) => {
          return {
            reservations: reserData.reservations.map((reservation) => {
              return {
                role: reservation.user.role,
                email: reservation.user.email,
                product: reservation.product.name,
                id: reservation._id,
                date: reservation.dateReservation,
              };
            }),
            count: reserData.count,
          };
        })
      )
      .subscribe((transformedData) => {
        this.reservations = transformedData.reservations;
        this.reservationsUpdated.next({
          reservations: [...this.reservations],
          count: transformedData.count,
        });
      });
  }

  getReservationUpdateListener() {
    return this.reservationsUpdated.asObservable();
  }

  deleteReservation(id: string) {
    return this.http.delete("http://localhost:3000/api/reserProduct/" + id);
  }

  getReservationById() {}
}
