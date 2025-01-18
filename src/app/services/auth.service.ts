import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'jwt_token';
  private baseUrl = `${environment.apiBaseUrl}/user-auth-service`;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  validateToken(): Observable<any> {
    return this.http.get(`${this.baseUrl}/validate`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  saveToken(token: string): void {
    console.log('Saving token to localStorage:', token); // Debug log
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): number | null {
    const token = this.getToken();
    console.log('Retrieved token:', token); // Debug log
  
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log('Decoded token:', decodedToken); // Debug log
        return decodedToken.sub?.user_id || null; // Ensure `sub.user_id` is accessed correctly
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}