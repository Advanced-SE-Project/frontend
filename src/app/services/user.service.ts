import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth-service/api/auth/register`, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth-service/api/auth/login`, { username, password });
  }

  changeCredentials(userId: number, newUsername: string, newPassword: string, newPasswordConfirm: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth-service/api/auth/change`, {
      user_id: userId,
      new_username: newUsername,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm,
    });
  }

  deleteAccount(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth-service/api/auth/delete`, {
      body: { user_id: userId },
    });
  }
}