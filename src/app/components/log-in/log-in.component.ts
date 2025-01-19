import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
        MatButtonModule,
    ],
    templateUrl: './log-in.component.html',
    styleUrl: './log-in.component.scss'
})

export class LogInComponent {
  user = { username: '', password: '' };
  errorMessage = '';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}


  login(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = 'http://localhost:2000/api/auth/login'; // Direct URL to the userAuth microservice

    this.http.post(url, this.user, { headers }).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.access_token);
        alert('Login successful!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = err.error.message || 'Login failed';
      },
    });
  }
}