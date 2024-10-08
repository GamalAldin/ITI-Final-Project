import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent, pathMatch: 'full' },
  { path: 'products/:_id', component: ProductDetailsComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
