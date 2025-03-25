import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartCount = new BehaviorSubject<number>(0); // ✅ Tracks cart count

  constructor() {
    this.loadCart();
  }

  // ✅ Load cart from Local Storage
  private loadCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.updateCartCount();
  }

  //  Get cart items
  getCart() {
    return this.cart;
  }

  //  Get cart count as an observable
  getCartCount() {
    return this.cartCount.asObservable();
  }

  //  Add product to cart or increase quantity
  addToCart(product: any) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1; //  Increase quantity if item exists
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.saveCart();
  }

  // Increase item quantity
  increaseQuantity(index: number) {
    this.cart[index].quantity += 1;
    this.saveCart();
  }

  //  Decrease item quantity (remove if quantity is 1)
  decreaseQuantity(index: number) {
    if (this.cart[index].quantity > 1) {
      this.cart[index].quantity -= 1;
    } else {
      this.cart.splice(index, 1); //  Remove item if quantity is 0
    }
    this.saveCart();
  }

  //  Remove item from cart
  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  // save cart to Local Storage and update count
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartCount();
  }

  // Update cart count
  private updateCartCount() {
    const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
    this.cartCount.next(totalItems);
  }

  //  Clear entire cart
  clearCart() {
    this.cart = [];
    this.saveCart();
  }
}
