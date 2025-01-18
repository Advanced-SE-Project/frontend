import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-log-in',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.scss'
})

export class LogInComponent {
  user = { username: '', password: '' };
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    this.http
      .post<{ access_token: string }>('http://localhost:5000/api/auth/login', {
        username: this.user.username,
        password: this.user.password,
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem('jwt_token', response.access_token);
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Invalid username or password';
        },
      });
  }
}