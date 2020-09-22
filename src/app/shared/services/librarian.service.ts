import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../models/User";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LibrarianService {
  private librarians: User[] = [];
  private librariansUpdated = new Subject<{
    librarians: User[];
    librarianCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  addLibrarian(
    fullName: string,
    email: string,
    password: string,
    role: string,
    salary: number
  ) {
    let librarianData = {
      fullName: fullName,
      email: email,
      password: password,
      role: role,
      salary: salary,
    };

    console.log(librarianData);

    return this.http
      .post("http://localhost:3000/api/librarian", librarianData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/accountant"]);
      });
  }

  getLibrarians(librarianPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${librarianPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; librarians: any; count: number }>(
        "http://localhost:3000/api/librarian" + queryParams
      )
      .pipe(
        map((librarianData) => {
          return {
            librarians: librarianData.librarians.map((librarian) => {
              return {
                fullName: librarian.fullName,
                email: librarian.email,
                role: librarian.role,
                salary: librarian.salary,
                id: librarian._id,
              };
            }),
            count: librarianData.count,
          };
        })
      )
      .subscribe((transformedLibrarian) => {
        // console.log(transformedLibrarian);
        this.librarians = transformedLibrarian.librarians;
        this.librariansUpdated.next({
          librarians: [...this.librarians],
          librarianCount: transformedLibrarian.count,
        });
      });
  }

  getLibrarianUpdateListener() {
    return this.librariansUpdated.asObservable();
  }

  updateLibrarian(id: string, fullName: string, email: string, salary: number) {
    let librarianData = {
      fullName: fullName,
      email: email,
      salary: salary,
    };
    return this.http
      .put("http://localhost:3000/api/librarian/" + id, librarianData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/librarians"]);
      });
  }

  getLibrarian(id: string) {
    return this.http.get<{
      _id: string;
      fullName: string;
      email: string;
      role: string;
      salary: number;
    }>("http://localhost:3000/api/librarian/" + id);
  }

  deleteLibrarian(librarianId: string) {
    return this.http.delete(
      "http://localhost:3000/api/accountant/" + librarianId
    );
  }
}
