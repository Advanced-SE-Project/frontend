import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-create-account',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  user = { username: '', password: '', confirmPassword: '' };

  constructor(private http: HttpClient, private router: Router) {}

  createAccount() {
    // Ensure passwords match before proceeding
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Send a POST request to the backend
    this.http.post('http://localhost:5000/api/auth/register', {
      username: this.user.username,
      password: this.user.password,
      password_confirm: this.user.confirmPassword
    }, {
      headers: { 'Content-Type': 'application/json' } // Ensure proper headers are included
    }).subscribe({
      next: (response: any) => {
        alert('Account created successfully!');
        this.router.navigate(['/log-in']); // Redirect to login page
      },
      error: (err) => {
        console.error(err);
  
        // Show user-friendly error messages based on backend response
        if (err.status === 400 && err.error.message) {
          alert(err.error.message); // Display backend error message
        } else {
          alert('Error creating account. Please try again.');
        }
      }
    });
  }
}