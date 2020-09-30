import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/shared/models/Product";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { productsService } from "src/app/shared/services/product.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { mimeType } from "./mime-type.validator";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  enteredName = "";
  enteredCategory = "";
  enteredStock = 0;
  enteredDescription = "";
  entered;
  product: Product;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private productId: string;

  constructor(
    public productsService: productsService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      category: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      stock: new FormControl(null, {
        validators: [Validators.required, Validators.min(1)],
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("productId")) {
        this.mode = "edit";
        this.productId = paramMap.get("productId");
        this.isLoading = true;
        this.productsService
          .getProduct(this.productId)
          .subscribe((productData) => {
            this.isLoading = false;
            this.product = {
              id: productData._id,
              name: productData.name,
              category: productData.category,
              stock: productData.stock,
              description: productData.description,
              imagePath: productData.imagePath,
            };
            this.form.patchValue({
              name: this.product.name,
              category: this.product.category,
              stock: this.product.stock,
              description: this.product.description,
              image: this.product.imagePath,
            });
          });
      } else {
        this.mode = "create";
        this.productId = null;
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

  onSaveProduct() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form);
    this.isLoading = true;
    if (this.mode === "create") {
      this.productsService.addProduct(
        this.form.value.name,
        this.form.value.category,
        this.form.value.stock,
        this.form.value.description,
        this.form.value.image
      );
    } else {
      this.productsService.updateProduct(
        this.productId,
        this.form.value.name,
        this.form.value.category,
        this.form.value.stock,
        this.form.value.description,
        this.form.value.image
      );
    }
    this.form.reset();
  }

  cancelForm() {
    this.form.reset();
    this.router.navigate(["/ecms/products"]);
  }
}
