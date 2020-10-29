import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/app/shared/models/Product";
import { productsService } from "src/app/shared/services/product.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { SettingService } from "src/app/shared/services/setting.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { DataTable } from "./datatable";

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
  productPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  role: string;

  settings = {};
  searchValue: string = "";

  constructor(
    private productsService: productsService,
    private settingService: SettingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.getPaginator();
    this.setRole();
  }

  public getProducts(filter: string) {
    this.productsService.getProducts(
      this.productPerPage,
      this.currentPage,
      filter
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

  setRole() {
    this.authService.userDetail().subscribe((detail) => {
      this.role = detail.role;
      console.log(this.role);
      let datatable = new DataTable();
      if (detail.role == "admin") {
        this.settings = datatable.settings_for_admin;
        this.getProducts("");
      } else {
        this.settings = datatable.settings_for_users;
        this.getProducts("");
      }
    });
  }

  productFilter(filter: string) {
    this.getProducts(filter);
    this.searchValue = filter;
  }

  onCustom(event) {
    if (event.action == "edit") {
      this.router.navigate(["/ecms/edit-product/" + event.data.id]);
    } else if (event.action == "delete") {
      if (confirm("are you sure to delete " + event.data.name)) {
        this.productsService.deleteProduct(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.productsService.getProducts(
            this.productPerPage,
            this.currentPage,
            this.searchValue
          );
        });
      }
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.productPerPage = pageData.pageSize;
    this.productsService.getProducts(
      this.productPerPage,
      this.currentPage,
      this.searchValue
    );
  }

  getPaginator() {
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.productPerPage = setting.paginator;
      this.productsService.getProducts(
        setting.paginator,
        this.currentPage,
        this.searchValue
      );
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
