import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { EventService } from "src/app/shared/services/event.service";

@Component({
  selector: "app-event-modal",
  templateUrl: "./event-modal.component.html",
  styleUrls: ["./event-modal.component.scss"],
})
export class EventModalComponent implements OnInit {
  private eventSub: Subscription;
  events: any;
  eventForm: FormGroup;
  message: string = "";
  isLoading = false;
  constructor(public eventsrv: EventService, public router: Router) {}

  ngOnInit(): void {
    // this.createAddEventForm();
    this.eventForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      start: new FormControl(null, { validators: [Validators.required] }),
      end: new FormControl(null, { validators: [Validators.required] }),
    });

    this.eventsrv.getEvents();
    this.eventSub = this.eventsrv.getEventUpdateListener().subscribe((data) => {
      this.isLoading = false;
      this.events = data.events;
    });
  }

  submitEvent() {
    const eventTitle = this.eventForm.get("title").value;
    const eventStartDate = this.eventForm.get("start").value;
    const eventEndDate = this.eventForm.get("end").value;

    const eventObj = {
      title: eventTitle,
      start: eventStartDate,
      end: eventEndDate,
    };

    this.eventsrv.addEvent(eventObj).subscribe((eventData) => {
      this.router.navigate(["/ecms/dashboard"]);
      console.log(eventData);
    });
    this.eventForm.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/dashboard"]);
  }

  onDelete(id: string) {
    this.eventsrv.deleteEvent(id).subscribe((data) => {
      this.message = data.message;
      this.isLoading = true;
      this.eventsrv.getEvents();
    });
  }
}
