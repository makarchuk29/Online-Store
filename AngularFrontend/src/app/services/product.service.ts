import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from '../common/product';
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/v1/products';
  private categoryUrl = 'http://localhost:8080/api/v1/product-category';

  constructor(private httpClient: HttpClient) {
  }

  getProducts(categoryId: number): Observable<Product[]> {
    const searchUrl = this.baseUrl + '/search/category-id?id=' + categoryId;
    return this.getProductList(searchUrl)
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string): Observable<Product[]> {
    console.log('search')
    const searchUrl = this.baseUrl + '/search/search-by-keyword?name=' + keyword;
    return this.getProductList(searchUrl)

  }
  private getProductList(searchUrl: string): Observable<Product[]>{
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products))
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
