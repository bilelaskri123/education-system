import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Profile } from "src/app/shared/models/Profile";
import { ProfileService } from "src/app/shared/services/profile.service";
import { mimeType } from "../add-product/mime-type.validator";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  form: FormGroup;
  public profile: Profile;
  imagePreview: string;
  constructor(private router: Router, private profileService: ProfileService) {}

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

    this.profileService.userProfile().subscribe((data) => {
      console.log(data);
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
}