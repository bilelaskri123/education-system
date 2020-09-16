import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TimeTableService } from "src/app/shared/services/timeTable.service";

@Component({
  selector: "app-newtimetable",
  templateUrl: "./newtimetable.component.html",
  styleUrls: ["./newtimetable.component.scss"],
})
export class NewtimetableComponent implements OnInit {
  groups: any;
  form: FormGroup;
  isLoading = false;
  constructor(private timeTableService: TimeTableService) {}

  ngOnInit() {
    this.form = new FormGroup({
      group: new FormControl(null, {
        validators: [Validators.required],
      }),

      file: new FormControl(null, {
        validators: [Validators.required],
      }),
      fileSource: new FormControl("", [Validators.required]),
    });

    this.timeTableService.getGroups().subscribe((groups) => {
      this.groups = groups;
      console.log(groups);
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file,
      });
    }
  }

  onSaveTimeTable() {
    this.timeTableService.addTimeTable(
      this.form.value.group,
      this.form.value.fileSource
    );
  }
}
