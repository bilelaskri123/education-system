import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AccountantService {
  private accountants: User[] = [];
  private accountantsUpdated = new Subject<{
    accountants: User[];
    accountantCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}
  addAccountant(
    fullName: string,
    email: string,
    password: string,
    role: string,
    salary: number
  ) {
    let accountantData = {
      fullName: fullName,
      email: email,
      password: password,
      role: role,
      salary: salary,
    };

    console.log(accountantData);

    return this.http
      .post("http://localhost:3000/api/accountant", accountantData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/accountant"]);
      });
  }

  getAccountants() {
    // const queryParams = `?pagesize=${accountantPerPage}&page=${currentPage}&search=${filtredBy}`;
    this.http
      .get<{ message: string; accountants: any; count: number }>(
        "http://localhost:3000/api/accountant"
      )
      .pipe(
        map((accountantData) => {
          return {
            accountants: accountantData.accountants.map((accountant) => {
              return {
                fullName: accountant.fullName,
                email: accountant.email,
                role: accountant.role,
                salary: accountant.salary,
                id: accountant._id,
              };
            }),
            count: accountantData.count,
          };
        })
      )
      .subscribe((transformedAccountant) => {
        this.accountants = transformedAccountant.accountants;
        this.accountantsUpdated.next({
          accountants: [...this.accountants],
          accountantCount: transformedAccountant.count,
        });
      });
  }

  getAccountantUpdateListener() {
    return this.accountantsUpdated.asObservable();
  }

  updateAccountant(
    id: string,
    fullName: string,
    email: string,
    salary: number
  ) {
    let accountantData = {
      fullName: fullName,
      email: email,
      salary: salary,
    };
    return this.http
      .put("http://localhost:3000/api/accountant/" + id, accountantData)
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/accountant"]);
      });
  }

  getAccountant(id: string) {
    return this.http.get<{
      _id: string;
      fullName: string;
      email: string;
      role: string;
      salary: number;
    }>("http://localhost:3000/api/accountant/" + id);
  }

  deleteAccountant(accountantId: string) {
    return this.http.delete(
      "http://localhost:3000/api/accountant/" + accountantId
    );
  }
}
