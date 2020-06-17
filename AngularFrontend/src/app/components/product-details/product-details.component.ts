import { Component, OnInit } from '@angular/core';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private _activatedRoute: ActivatedRoute,
              private _productService: ProductService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBookInfo();
      }
    )
  }

  getBookInfo(){
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');

    this._productService.get(id).subscribe(
      data => {
        this.product = data;
      }
    );
  }

}
