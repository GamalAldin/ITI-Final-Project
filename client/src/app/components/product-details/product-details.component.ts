import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http'; 
import { CommonModule } from '@angular/common'; 

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Product {
  _id: string;
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
  quantity?: number;
}

@Component({
  selector: 'app-product-details',
  standalone: true, 
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product; 

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchProduct();
  }

  fetchProduct(): void {
    const id = this.route.snapshot.paramMap.get('_id'); 
    if (id) {
      this.http.get<Product>(`http://localhost:3000/products/${id}`).subscribe({
        next: (product) => {
          this.product = product;
        },
        error: (error) => {
          console.error('Error fetching product:', error);
        },
        complete: () => {
          console.log('Product fetch completed');
        },
      });
    } else {
      console.error('No product ID found in route');
    }
  }

  addToCart(product: Product): void {
    const cartItems: Product[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

    const existingItem = cartItems.find(
      (item: Product) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity!++;
    } else {
      product.quantity = 1; 
      cartItems.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert(`${product.title} has been added to your cart!`);
  }
}
