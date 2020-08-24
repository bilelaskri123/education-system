import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { mimeType } from "../add-product/mime-type.validator";
import { SectionService } from "src/app/shared/services/section.service";
import { Section } from "src/app/shared/models/Section";

@Component({
  selector: "app-add-section",
  templateUrl: "./add-section.component.html",
  styleUrls: ["./add-section.component.scss"],
})
export class AddSectionComponent implements OnInit {
  form: FormGroup;
  section: Section;
  imagePreview: string;
  private mode: string = "create";
  private sectionId: string;

  isLoading = false;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public sectionService: SectionService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      hours: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("sectionId")) {
        this.mode = "edit";
        this.sectionId = paramMap.get("sectionId");
        this.isLoading = true;
        this.sectionService
          .getSection(this.sectionId)
          .subscribe((sectionData) => {
            this.isLoading = false;
            this.section = {
              id: sectionData._id,
              name: sectionData.name,
              hours: sectionData.hours,
              description: sectionData.description,
              imagePath: sectionData.imagePath,
            };
            this.form.setValue({
              name: this.section.name,
              hours: this.section.hours,
              description: this.section.description,
              image: this.section.imagePath,
            });
          });
      } else {
        this.mode = "create";
        this.sectionId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveSection() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
    this.isLoading = true;
    if (this.mode === "create") {
      this.sectionService.addSection(
        this.form.value.name,
        this.form.value.hours,
        this.form.value.description,
        this.form.value.image
      );
    } else {
      this.sectionService.updateSection(
        this.sectionId,
        this.form.value.name,
        this.form.value.hours,
        this.form.value.description,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  cancelForm() {
    this.form.reset();
    this.router.navigate(["/ecms/section"]);
  }
}
