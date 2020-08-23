import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/app/shared/models/Product";
import { productsService } from "src/app/shared/services/product.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading = false;
  private productsSub: Subscription;

  totalProducts = 0;
  productPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  constructor(private productsService: productsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts(this.productPerPage, this.currentPage);
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

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.productPerPage = pageData.pageSize;
    this.productsService.getProducts(this.productPerPage, this.currentPage);
  }

  onDelete(productId: string) {
    this.productsService.deleteProduct(productId).subscribe(() => {
      this.isLoading = true;
      this.productsService.getProducts(this.productPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
