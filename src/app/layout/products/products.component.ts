import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/app/shared/models/Product";
import { productsService } from "src/app/shared/services/product.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading = false;
  private productsSub: Subscription;
  form: FormGroup;

  totalProducts = 0;
  productPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(private productsService: productsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.form = new FormGroup({
      search: new FormControl(null, { validators: [Validators.nullValidator] }),
    });
    this.getProducts("");
  }

  public getProducts(filtredBy: string) {
    this.productsService.getProducts(
      this.productPerPage,
      this.currentPage,
      filtredBy
    );
    this.productsSub = this.productsService
      .getProductUpdateListener()
      .subscribe(
        (productData: { products: Product[]; productCount: number }) => {
          this.isLoading = false;
          this.totalProducts = productData.productCount;
          this.products = productData.products;
        }
      );
  }

  test() {
    this.getProducts(this.form.value.search);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.productPerPage = pageData.pageSize;
    this.productsService.getProducts(this.productPerPage, this.currentPage, "");
  }

  onDelete(productId: string) {
    this.productsService.deleteProduct(productId).subscribe(() => {
      this.isLoading = true;
      this.productsService.getProducts(
        this.productPerPage,
        this.currentPage,
        ""
      );
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
