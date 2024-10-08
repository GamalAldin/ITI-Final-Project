import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Product {
  _id: string;
  title: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  private apiUrl = 'http://localhost:3000/cart';
  private orderUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  }

  increaseQuantity(item: Product): void {
    item.quantity++;
    this.updateCart();
  }

  decreaseQuantity(item: Product): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.updateCart();
  }

  private updateCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  get total(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }

  checkout(): void {
    const orders = this.cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    orders.forEach((orderRequest) => {
      this.http.post('http://localhost:3000/order', orderRequest).subscribe({
        next: (response) => {
          console.log('Order placed successfully:', response);
        },
        error: (error) => {
          console.error('Error placing order:', error);
        },
      });
    });


    this.cartItems = [];
    this.updateCart();
  }
}
