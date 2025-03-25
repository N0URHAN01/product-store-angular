import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DiscountPricePipe } from '../../pipes/discount-price.pipe'; 
import { CartService } from '../../services/cart.service'; 

@Component({
  imports: [CommonModule, DiscountPricePipe, RouterModule],
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart() {
    if (this.product.stock > 0) {
      this.cartService.addToCart(this.product);
    } else {
      alert("This product is out of stock.");
    }
  }
}
