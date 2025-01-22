import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
  ): boolean {
    // Check if the user is logged in
    if (this.authService.getToken()) {
      return true; // Allow access to the route
    }

    // Redirect to the login page if not logged in
    this.router.navigate(['/log-in']);
    return false;
  }
}