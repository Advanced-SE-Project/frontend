import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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

  constructor(private router: Router) {}

  createAccount() {
    if (this.user.password === this.user.confirmPassword) {
      console.log('Account created:', this.user);
      this.router.navigate(['/log-in']);
    } else {
      console.error('Passwords do not match');
    }
  }
}