import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  // products with pagination
  getProducts(limit: number = 10, skip: number = 0): Observable<{ products: Product[], total: number }> {
    return this.http.get<{ products: Product[], total: number }>(`${this.baseUrl}?limit=${limit}&skip=${skip}`);
  }

  // Fetch product details by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }
}
