import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Reservation } from "../models/Reservation";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ReservationBookService {
  private reservations: Reservation[] = [];
  private reservationsUpdated = new Subject<{
    reservations: Reservation[];
    count: number;
  }>();
  constructor(private http: HttpClient, private router: Router) {}

  getUsers() {
    return this.http.get("http://localhost:3000/api/auth/users");
  }

  getFreeBooks() {
    return this.http
      .get<{ books: any }>("http://localhost:3000/api/book/free")
      .pipe(
        map((books) => {
          return {
            books: books.books.map((book) => {
              return {
                id: book._id,
                title: book.title,
                auther: book.auther,
                pages: book.pages,
                copies: book.copies,
                description: book.description,
                imagePath: book.imagePath,
              };
            }),
          };
        })
      );
  }

  newReservation(user: string, book: string) {
    let reserData = {
      user: user,
      book: book,
    };
    this.http
      .post<{ message: string }>(
        "http://localhost:3000/api/reserBook",
        reserData
      )
      .subscribe((response) => {
        this.router.navigate(["/ecms/book-reservation"]);
      });
  }

  getReservations(reserPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${reserPerPage}&page=${currentPage}`;
    return this.http
      .get<{ message: string; reservations: any; count: number }>(
        "http://localhost:3000/api/reserBook" + queryParams
      )
      .pipe(
        map((reserData) => {
          return {
            reservations: reserData.reservations.map((reservation) => {
              console.log(reservation);
              return {
                email: reservation.user.email,
                book: reservation.book.title,
                role: reservation.user.role,
                id: reservation._id,
                date: reservation.dateReservation,
              };
            }),
            count: reserData.count,
          };
        })
      )
      .subscribe((transformedData) => {
        console.log(transformedData.reservations);
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
    return this.http.delete("http://localhost:3000/api/reserBook/" + id);
  }

  getReservationById() {}

  getMyReservation() {
    return this.http.get("http://localhost:3000/api/reserBook/myReservation");
  }
}
