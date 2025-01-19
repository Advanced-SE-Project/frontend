import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

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
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  createAccount(): void {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.http
      .post<{ access_token: string }>('http://localhost:2000/auth-service/api/auth/register', {
        username: this.user.username,
        password: this.user.password,
        password_confirm: this.user.confirmPassword,
      })
      .subscribe({
        next: (response) => {
          alert('Account created successfully!');
          this.router.navigate(['/log-in']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.error.message || 'Registration failed';
        },
      });
  }
}