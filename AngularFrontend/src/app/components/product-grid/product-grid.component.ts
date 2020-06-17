import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})
export class ProductGridComponent implements OnInit {

  products: Product[] = [];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(){
    this._productService.getProducts().subscribe(
      data => this.products = data
    );
  }

}
