import { Component, OnInit } from "@angular/core";
import { ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NoteService } from "src/app/shared/services/note.service";
import { mimeType } from "../add-product/mime-type.validator";

@Component({
  selector: "app-payement",
  templateUrl: "./payement.component.html",
  styleUrls: ["./payement.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PayementComponent implements OnInit {
  form: FormGroup;

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      problem: new FormControl(null, { validators: [Validators.required] }),
      solution: new FormControl(null, { validators: [Validators.required] }),
    });
  }

  createNote() {
    if (this.form.invalid) {
      return;
    }
    // console.log(this.form.value);
    this.noteService
      .createNote(
        this.form.value.title,
        this.form.value.problem,
        this.form.value.solution
      )
      .subscribe((data) => {
        // console.log(data);
        this.router.navigate(["/ecms/dashboard"]);
      });
  }
}
