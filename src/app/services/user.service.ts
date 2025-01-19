import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  register(username: string, password: string, passwordConfirm: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      username,
      password,
      password_confirm: passwordConfirm,
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  changeCredentials(userId: number, newUsername: string, newPassword: string, newPasswordConfirm: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/change`, {
      user_id: userId,
      new_username: newUsername,
      new_password: newPassword,
      new_password_confirm: newPasswordConfirm,
    });
  }

  deleteAccount(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete`, {
      body: { user_id: userId },
    });
  }
}