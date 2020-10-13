import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { TimeTable } from '../models/TimeTable';

let URLGROUP = "http://localhost:3000/api/group/all";
let URLTIMETABLE = "http://localhost:3000/api/timeTable";

@Injectable({
  providedIn: "root",
})
export class TimeTableService {
  private timeTables: any;
  private timeTableUpdated = new Subject<{ timeTables: any}>();
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
    this.http.get<{timeTables: TimeTable[]}>(URLTIMETABLE).subscribe((timeTbaleData) => {
      this.timeTables = timeTbaleData;
      this.timeTableUpdated.next({
        timeTables: [...this.timeTables],
      })
    })
  }
  getTimeTablesUpdatedListener() {
    return this.timeTableUpdated.asObservable();
  }

  downloadFile(file: String) {
    var body = { filename: file };

    return this.http.post(URLTIMETABLE + "/" + "download", body, {
      responseType: "blob",
    });
  }

  deleteTable(id: string) {
    return this.http.delete(URLTIMETABLE +'/'+ id);
  }
}
