import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const BASEURL = "http://localhost:3000/api/resetPassword";

@Injectable({
  providedIn: "root",
})
export class ResetService {
  constructor(private http: HttpClient) {}

  requestReset(body): Observable<any> {
    return this.http.post(`${BASEURL}/req-reset-password`, body);
  }

  newPassword(body): Observable<any> {
    return this.http.post(`${BASEURL}/new-password`, body);
  }

  validPassswordToken(body): Observable<any> {
    return this.http.post(`${BASEURL}/valid-password-token`, body);
  }
}
