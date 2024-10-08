import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  filteredProducts: Product[] = [];
  searchQuery: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      if (this.searchQuery) {
        this.searchProducts();
      }
    });
  }

  searchProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }
}
