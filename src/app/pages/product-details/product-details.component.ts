import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { DiscountPricePipe } from '../../pipes/discount-price.pipe'; 

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, DiscountPricePipe], 
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product!: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.productService.getProductById(id).subscribe(data => {
        this.product = data!;
      });
    }
  }

  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
  
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
  
    // Add half star if needed
    if (hasHalfStar) {
      stars.push('half');
    }
  
    // Fill remaining with empty stars
    while (stars.length < 5) {
      stars.push('empty');
    }
  
    return stars;
  }
}
