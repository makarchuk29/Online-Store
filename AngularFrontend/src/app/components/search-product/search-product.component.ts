import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  searchProducts(keyword: string){
    console.log('key', keyword);
    this._router.navigateByUrl("/search/" + keyword)
  }

}
