import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {CartService} from '../../services/cart.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private _activatedRoute: ActivatedRoute,
              private _productService: ProductService,
              private _cartService: CartService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getProductInfo();
      }
    )
  }

  getProductInfo(){
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');

    this._productService.get(id).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addToCart(){
    console.log(`product name: ${this.product.name}, and price: ${this.product.unitPrice}`);
    const cartItem = new CartItem(this.product);
    this._cartService.addToCart(cartItem);
  }

}
