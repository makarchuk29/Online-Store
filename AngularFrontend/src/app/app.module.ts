import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductService } from './services/product.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component'
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'products', component: ProductGridComponent},
  {path: 'search/:keyword', component: ProductGridComponent},
  {path: 'category/:id', component: ProductGridComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    ProductGridComponent,
    PageNotFoundComponent,
    ProductCategoryComponent,
    SearchProductComponent,
    ProductDetailsComponent,
    JwPaginationComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
