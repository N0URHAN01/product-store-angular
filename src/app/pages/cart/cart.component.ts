import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
    this.cart = this.cartService.getCart();
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
    this.cart = this.cartService.getCart();
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    this.cart = this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart = [];
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
