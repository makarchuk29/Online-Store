import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Product} from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/v1/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}
