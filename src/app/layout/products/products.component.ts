import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/app/shared/models/Product";
import { productsService } from "src/app/shared/services/product.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading = false;
  private productsSub: Subscription;
  constructor(private productsService: productsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.productsService.getProducts();
    this.productsSub = this.productsService
      .getProductUpdateListener()
      .subscribe((products: Product[]) => {
        this.isLoading = false;
        this.products = products;
      });
  }

  onDelete(productId: string) {
    this.productsService.deleteProduct(productId);
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
