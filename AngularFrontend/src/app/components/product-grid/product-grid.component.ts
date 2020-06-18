import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategoryId: number = 1;

  currentPage: number = 1;
  pageSize: number = 6;
  totalRecords: number = 0;


  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute, private _cartService: CartService) {
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      //search
      this.handleSearchProducts()
    }else {
      //display category
      this.handleListProducts()
    }
  }

  handleListProducts(){
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }else {
      this.currentCategoryId = 1;
    }
    //setting up the page number to 1
    //if user navigates to other category
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }
    this.previousCategoryId = this.currentCategoryId;


    this._productService.getProducts(this.currentCategoryId, this.currentPage - 1, this.pageSize).subscribe(
      this.processPaginate()
    );
  }

  handleSearchProducts(){
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._productService.searchProducts(keyword, this.currentPage - 1, this.pageSize).subscribe(
      this.processPaginate()
    )
  }
  updatePageSize(pageSize: number){
    console.log(pageSize);
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listProducts();
  }

  processPaginate(){
    return data => {
      this.products = data._embedded.products;
      //page number from 1 index
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }
  addToCart(product: Product){
    console.log(`book name: ${product.name}, and price: ${product.unitPrice}`);
    const cartItem = new CartItem(product);
    this._cartService.addToCart(cartItem);
  }
}
