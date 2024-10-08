import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'products-app';
  searchQuery: string = '';

  constructor(private router: Router, private productService: ProductService) {}

  searchProducts() {
    console.log('Search query:', this.searchQuery);
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
  }
}
