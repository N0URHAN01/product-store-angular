import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
  
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }
}
