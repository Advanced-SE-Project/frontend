import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
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

export class LoginComponent {
  user = { username: '', password: '' };

  constructor(private router: Router) {}

  login() {
    console.log('User logged in:', this.user);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    console.log('User logged out');
    this.router.navigate(['/about']);
  }
}