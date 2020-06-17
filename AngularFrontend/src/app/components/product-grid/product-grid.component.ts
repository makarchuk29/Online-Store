import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private _productService: ProductService, private _activatedRoute: ActivatedRoute) {
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
    this._productService.getProducts(this.currentCategoryId).subscribe(
      data => this.products = data
    );
  }

  handleSearchProducts(){
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');
    this._productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data
      }
    )
  }
}
