import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../../components/product-card/product-card.component';  

@Component({
  selector: 'app-products',
  standalone: true,  
  imports: [CommonModule, ProductCardComponent],  
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  totalProducts: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  maxPagesToShow: number = 5; // ✅ Only show 5 pages at a time

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    const skip = (this.currentPage - 1) * this.itemsPerPage;
    this.productService.getProducts(this.itemsPerPage, skip).subscribe(response => {
      this.products = response.products;
      this.totalProducts = response.total;
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return; // ✅ Prevent invalid page navigation
    this.currentPage = page;
    this.fetchProducts();
  }

  get totalPages(): number {
    return Math.min(20, Math.ceil(this.totalProducts / this.itemsPerPage)); // ✅ Limit to 20 pages max
  }

  get pages(): number[] {
    let start = Math.max(1, this.currentPage - Math.floor(this.maxPagesToShow / 2));
    let end = Math.min(this.totalPages, start + this.maxPagesToShow - 1);

    if (end - start + 1 < this.maxPagesToShow) {
      start = Math.max(1, end - this.maxPagesToShow + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
