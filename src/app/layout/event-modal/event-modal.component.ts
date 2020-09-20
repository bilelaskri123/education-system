import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EventService } from "src/app/shared/services/event.service";

@Component({
  selector: "app-event-modal",
  templateUrl: "./event-modal.component.html",
  styleUrls: ["./event-modal.component.scss"],
})
export class EventModalComponent implements OnInit {
  eventForm: FormGroup;
  constructor(public eventsrv: EventService) {}

  ngOnInit(): void {
    // this.createAddEventForm();
    this.eventForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      start: new FormControl(null, { validators: [Validators.required] }),
      end: new FormControl(null, { validators: [Validators.required] }),
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

    this.eventsrv.addEvent(eventObj);
    this.eventForm.reset();
  }
}
