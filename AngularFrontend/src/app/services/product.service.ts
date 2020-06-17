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

  getProducts(categoryId: number, currentPage: number, pageSize: number): Observable<GetResponseProducts> {
    const searchUrl = this.baseUrl + '/search/category-id?id=' + categoryId + '&page=' + currentPage + '&size=' + pageSize;
    return this.httpClient.get<GetResponseProducts>(searchUrl)
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseProducts> {
    console.log('search')
    const searchUrl = this.baseUrl + '/search/search-by-keyword?name=' + keyword + '&page=' + currentPage + '&size=' + pageSize;
    return this.httpClient.get<GetResponseProducts>(searchUrl)

  }
  private getProductList(searchUrl: string): Observable<Product[]>{
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(map(response => response._embedded.products))
  }

  get(bookId: number): Observable<Product> {
    const bookDetailsUrl = `${this.baseUrl}/${bookId}`;
    return this.httpClient.get<Product>(bookDetailsUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    //cureent page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages: number,
    //current page
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
