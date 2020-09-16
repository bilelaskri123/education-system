import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

let URLGROUP = "http://localhost:3000/api/group/all";
let URLTIMETABLE = "http://localhost:3000/api/timeTable";

@Injectable({
  providedIn: "root",
})
export class TimeTableService {
  constructor(private http: HttpClient, private router: Router) {}

  getGroups() {
    return this.http.get(URLGROUP);
  }

  addTimeTable(group: string, file: File) {
    console.log(group, file);
    const formData = new FormData();
    formData.append("group", group);
    formData.append("file", file);
    this.http.post(URLTIMETABLE, formData).subscribe(() => {
      this.router.navigate(["/ecms/timetables"]);
    });
  }

  getTimeTables() {
    return this.http.get(URLTIMETABLE);
  }
}
