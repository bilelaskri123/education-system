import { Injectable } from "@angular/core";
import { Product } from "../models/Product";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class productsService {
  private products: Product[] = [];
  private productsUpdated = new Subject<{
    products: Product[];
    productCount: number;
  }>();
  constructor(private http: HttpClient, private router: Router) {}

  getProducts() {
    // productsPerPage: number, currentPage: number, filtredBy: string
    // const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}&search=${filtredBy}`;
    this.http
      .get<{ message: string; products: any; maxProducts: number }>(
        "http://localhost:3000/api/product"
      )
      .pipe(
        map((productData) => {
          return {
            products: productData.products.map((product) => {
              return {
                name: product.name,
                category: product.category,
                stock: product.stock,

                description: product.description,
                id: product._id,
                imagePath: product.imagePath,
              };
            }),
            maxProducts: productData.maxProducts,
          };
        })
      )
      .subscribe((transformedProductsData) => {
        this.products = transformedProductsData.products;
        this.productsUpdated.next({
          products: [...this.products],
          productCount: transformedProductsData.maxProducts,
        });
      });
  }

  getProductUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  getProduct(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      category: string;
      stock: number;
      description: string;
      imagePath: string;
    }>("http://localhost:3000/api/product/" + id);
  }

  addProduct(
    name: string,
    category: string,
    stock: number,
    description: string,
    image: File
  ) {
    const productData = new FormData();
    let stockUpdated = stock.toString();
    productData.append("name", name);
    productData.append("category", category);
    productData.append("stock", stockUpdated);
    productData.append("image", image, name);
    productData.append("description", description);

    console.log(productData);

    this.http
      .post<{ message: string; product: Product }>(
        "http://localhost:3000/api/product",
        productData
      )
      .subscribe((responseData) => {
        this.router.navigate(["/ecms/products"]);
      });
  }

  updateProduct(
    id: string,
    name: string,
    category: string,
    stock: number,
    description: string,
    image: File | string
  ) {
    let productData: Product | FormData;
    if (typeof image === "object") {
      let stockUpdated = stock.toString();
      productData = new FormData();
      productData.append("id", id);
      productData.append("name", name);
      productData.append("category", category);
      productData.append("stock", stockUpdated);
      productData.append("description", description);
      productData.append("image", image, name);
    } else {
      productData = {
        id: id,
        name: name,
        category: category,
        stock: stock,
        description: description,
        imagePath: image,
      };
    }

    this.http
      .put("http://localhost:3000/api/product/" + id, productData)
      .subscribe((response) => {
        this.router.navigate(["/ecms/products"]);
      });
  }

  deleteProduct(productId: string) {
    return this.http.delete("http://localhost:3000/api/product/" + productId);
  }
}
