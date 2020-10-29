import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Profile } from "../models/Profile";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private http: HttpClient, private router: Router) {}

  userProfile(): Observable<{
    profile: Profile;
  }> {
    return this.http.get<{
      profile: Profile;
    }>("http://localhost:3000/api/profile/pro");
  }

  updateProfile(
    id: string,
    fullName: string,
    adress: string,
    birdhday: string,
    phone: string,
    linkedin: string,
    image: File | string
  ) {
    let profileData: Profile | FormData;
    if (typeof image === "object") {
      profileData = new FormData();
      profileData.append("fullName", fullName);
      profileData.append("adress", adress);
      profileData.append("birdhday", birdhday);
      profileData.append("phone", phone);
      profileData.append("linkedin", linkedin);
      profileData.append("image", image, fullName);
    } else {
      profileData = {
        _id: id,
        fullName: fullName,
        adress: adress,
        birdhday: birdhday,
        phone: phone,
        linkedin: linkedin,
        image: image,
      };
    }

    this.http
      .put("http://localhost:3000/api/profile/" + id, profileData)
      .subscribe((response) => {
        // this.router.navigate(["/ecms/dashboard"]);
        window.location.reload();
      });
  }
}
