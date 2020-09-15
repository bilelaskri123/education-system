import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Program } from "src/app/shared/models/Program";
import { ProgramService } from "src/app/shared/services/program.service";

@Component({
  selector: "app-new-program",
  templateUrl: "./new-program.component.html",
  styleUrls: ["./new-program.component.scss"],
})
export class NewProgramComponent implements OnInit {
  lessons: any;
  sections: any;
  form: FormGroup;
  isLoading = false;
  private mode = "create";
  private programId: string;
  program: Program;
  constructor(
    private router: Router,
    private programService: ProgramService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.programService.getAllSubject().subscribe((lessons) => {
      this.lessons = lessons;
      console.log(this.lessons);
    });

    this.programService.getAllSection().subscribe((sections) => {
      this.sections = sections;
      console.log(this.sections);
    });

    this.form = new FormGroup({
      section: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),

      level: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      lessons: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("programId")) {
        this.mode = "edit";
        this.programId = paramMap.get("programId");
        this.isLoading = true;
        this.programService
          .getProgram(this.programId)
          .subscribe((programData) => {
            this.isLoading = false;
            this.program = {
              _id: programData._id,
              section: programData.section,
              level: programData.level,
              lessons: programData.lessons,
            };

            this.form.patchValue({
              section: this.program.section,
              level: this.program.level,
              lessons: this.program.lessons,
            });
          });
      } else {
        this.mode = "create";
        this.programId = null;
      }
    });
  }

  onSaveProgram() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.isLoading = true;
    if (this.mode === "create") {
      this.programService.addProgram(
        this.form.value.section,
        this.form.value.level,
        this.form.value.lessons
      );
    } else {
      this.programService.updateProgram(
        this.programId,
        this.form.value.section,
        this.form.value.level,
        this.form.value.lessons
      );
    }
    this.form.reset();
  }

  cancelForm() {
    this.router.navigate(["/ecms/program"]);
  }
}
