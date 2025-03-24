import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DiscountPricePipe } from '../../pipes/discount-price.pipe'; 

@Component({
  imports: [CommonModule, DiscountPricePipe,RouterModule],
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
}
