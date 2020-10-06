import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Profile } from "src/app/shared/models/Profile";
import { AuthService } from "src/app/shared/services/auth.service";
import { CvService } from "src/app/shared/services/cv.service";

import { ProfileService } from "src/app/shared/services/profile.service";
import { mimeType } from "../add-product/mime-type.validator";
import { ConfirmedValidator } from "./confirmed.validator";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  hide = true;
  form: FormGroup;
  pwChangeForm: FormGroup;
  cvForm: FormGroup;

  public profile: Profile;
  fullName: string;
  email: string;
  role: string;
  image: string;

  imagePreview: string;
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private cvService: CvService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      fullName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      adress: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      birdhday: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      linkedin: new FormControl(null, { validators: [Validators.required] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.pwChangeForm = this.fb.group(
      {
        current: ["", [Validators.required]],
        newPW: ["", [Validators.required]],
        confirm: ["", Validators.required],
      },
      {
        validator: ConfirmedValidator("newPW", "confirm"),
      }
    );

    this.cvForm = this.fb.group({
      skills: this.fb.array([]),
      projects: this.fb.array([]),
    });

    this.profileService.userProfile().subscribe((data) => {
      this.email = data.profile.email;
      this.fullName = data.profile.fullName;
      this.role = data.profile.role;
      this.image = data.profile.image;
      this.profile = {
        _id: data.profile._id,
        fullName: data.profile.fullName,
        email: data.profile.email,
        role: data.profile.role,
        adress: data.profile.adress,
        birdhday: data.profile.birdhday,
        phone: data.profile.phone,
        linkedin: data.profile.linkedin,
        image: data.profile.image,
      };
      this.form.patchValue({
        id: this.profile._id,
        fullName: this.profile.fullName,
        email: this.profile.email,
        role: this.profile.role,
        adress: this.profile.adress,
        birdhday: this.profile.birdhday,
        phone: this.profile.phone,
        linkedin: this.profile.linkedin,
        image: this.profile.image,
      });
    });
  }

  projects(): FormArray {
    return this.cvForm.get("projects") as FormArray;
  }

  skills(): FormArray {
    return this.cvForm.get("skills") as FormArray;
  }

  newProject(): FormGroup {
    return this.fb.group({
      project: "",
      description: "",
    });
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: "",
      level: 0,
    });
  }

  addProject() {
    this.projects().push(this.newProject());
  }

  addSkill() {
    this.skills().push(this.newSkill());
  }

  removeProject(i: number) {
    this.projects().removeAt(i);
  }

  removeSkill(i: number) {
    this.skills().removeAt(i);
  }

  get f() {
    return this.pwChangeForm.controls;
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

  onSaveProfile() {
    if (this.form.invalid) {
      return;
    }
    this.profileService.updateProfile(
      this.profile._id,
      this.form.value.fullName,
      this.form.value.adress,
      this.form.value.birdhday,
      this.form.value.phone,
      this.form.value.linkedin,
      this.form.value.image
    );

    this.form.reset();
  }

  saveCv() {
    // console.log(this.cvForm.value);
    this.cvService.saveCv(this.cvForm.value);
    this.cvForm.reset();
  }

  changePassword() {
    if (this.pwChangeForm.invalid) {
      return;
    }

    this.authService
      .changePassword(
        this.pwChangeForm.value.current,
        this.pwChangeForm.value.newPW,
        this.pwChangeForm.value.confirm
      )
      .subscribe((response) => {
        this.router.navigate(["/login"]);
      });
  }
}
