import { Component, OnInit, OnDestroy } from "@angular/core";
import { Product } from "src/app/shared/models/Product";
import { productsService } from "src/app/shared/services/product.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { SettingService } from 'src/app/shared/services/setting.service';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading = false;
  private productsSub: Subscription;
  // form: FormGroup;

  totalProducts = 0;
  productPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  settings = {
    columns : {
      imagePath: {
        title: 'image',
        type: 'html',
        valuePrepareFunction:(imagePath: string) => {return `<img src="${imagePath}">`}
      },
      name : {
        title: 'Name'
      },
      category : {
        title: 'Category'
      },
      stock : {
        title: 'Disponible'
      },
      description: {
        title: 'Description'
      }
    },
    actions: {
      custom : [
        {
          name: 'edit',
          title: '<i class="fas fa-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="far fa-trash-alt"></i>'
        },
      ],
      add: false,
      edit: false,
      delete: false,
      position: 'right'
    },
    attr: {
      class: 'table table-bordered'
    }
  }
  constructor(private productsService: productsService,
    private settingService: SettingService,
    private router: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.getProducts("");
    this.getPaginator();
  }

  public getProducts(filter: string) {
    this.productsService.getProducts(this.productPerPage, this.currentPage, filter);
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

  productFilter(filter: string) {
    this.getProducts(filter);
  }

  onCustom(event) {
    if(event.action == 'edit') {
      this.router.navigate(['/ecms/edit-product/' + event.data.id])
    }
    else if (event.action == 'delete') {
      if (confirm('are you sure to delete '+ event.data.name)) {
        this.productsService.deleteProduct(event.data.id).subscribe(() => {
          this.isLoading = true;
          this.productsService.getProducts(this.productPerPage, this.currentPage, "");
        })
      }
    }
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.productPerPage = pageData.pageSize;
    this.productsService.getProducts(this.productPerPage, this.currentPage, "");
  }

  getPaginator(){
    this.settingService.getSettings();
    this.settingService.getSettingUpdateListener().subscribe((setting) => {
      this.productPerPage = setting.paginator;
      this.productsService.getProducts(setting.paginator, this.currentPage,"");
    })
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
