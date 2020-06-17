import {Component, OnInit} from '@angular/core';
import {ProductCategory} from '../../common/product-category';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private _productService: ProductService) {
  }

  ngOnInit(): void {
    this.listProductCategories()
  }

  listProductCategories() {
    this._productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data
      }
    );
  }

}
