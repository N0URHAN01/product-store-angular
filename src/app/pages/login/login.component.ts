import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = "Please enter valid email and password.";
      return;
    }

    if (this.email === 'test@example.com' && this.password === 'Test@1234') {
      alert('Login Successful!');
      this.router.navigate(['/products']);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}
