import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // Add this import
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private jsonUrl = 'assets/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(this.jsonUrl).pipe(
      map(response => response.products)
    );
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === id))
    );
  }
}
