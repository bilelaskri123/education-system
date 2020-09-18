import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EventService } from "src/app/shared/services/event.service";

@Component({
  selector: "app-event-modal",
  templateUrl: "./event-modal.component.html",
  styleUrls: ["./event-modal.component.scss"],
})
export class EventModalComponent implements OnInit {
  eventForm: FormGroup;
  constructor(
    public eventsrv: EventService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.createAddEventForm();
    this.eventForm = this.formBuilder.group({
      eventTitle: "",
      eventstart: "",
      eventend: "",
    });
  }

  private createAddEventForm() {
    this.eventForm = this.formBuilder.group({
      eventtitle: "",
      eventstart: "",
      eventend: "",
    });
  }

  submitEvent() {
    const eventTitle = this.eventForm.get("eventtitle").value;
    const eventStartDate = this.eventForm.get("eventstart").value;
    const eventEndDate = this.eventForm.get("eventend").value;

    const eventObj = {
      title: eventTitle,
      start: eventStartDate,
      end: eventEndDate,
    };

    this.eventsrv.addEvent(eventObj);
    this.activeModal.close();
  }
}
