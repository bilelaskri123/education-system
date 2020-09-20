import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IEvent } from "../models/event.model";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EventService {
  events: any;
  private url: string;
  private eventsList: IEvent[] = [];
  private eventUpdate = new Subject<{ events: IEvent[] }>();

  constructor(private http: HttpClient) {}

  // Events - get all Events
  getEvents() {
    this.url = "http://localhost:3000/api/events/";
    return this.http
      .get<IEvent[]>(this.url)
      .pipe(
        map((eventData) => {
          return {
            transformedEvent: eventData.map((newEvent) => {
              return {
                title: newEvent.title,
                start: new Date(newEvent.start).toISOString().slice(0, 10),
                end: new Date(newEvent.end).toISOString().slice(0, 10),
                id: newEvent._id,
              };
            }),
          };
        })
      )
      .subscribe((data) => {
        this.events = data.transformedEvent;
        this.eventUpdate.next({
          events: [...this.events],
        });
      });
  }

  getEventUpdateListener() {
    return this.eventUpdate.asObservable();
  }

  addEvent(event: any) {
    this.url = "http://localhost:3000/api/events";
    return this.http.post(this.url, event);
  }

  // updateEvent(eventID: any, event: IEvent) {
  //   this.url = "http://localhost:3000/api/events/" + eventID;

  //   this.http.put(this.url, event).subscribe((response) => {
  //     const updateEvent = [...this.eventsList];
  //     const oldPostIndex = updateEvent.findIndex((p) => p._id === event._id);

  //     updateEvent[oldPostIndex] = event;

  //     this.eventsList = updateEvent;
  //     this.eventUpdate.next([...this.eventsList]);
  //   });
  // }

  deleteEvent(eventID: any): Observable<{ message: string }> {
    let url = "http://localhost:3000/api/events/" + eventID;
    return this.http.delete<{ message: string }>(url);
  }
}
