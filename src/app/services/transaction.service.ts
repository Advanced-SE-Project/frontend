import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = `${environment.apiBaseUrl}/transaction-service/api/transactions`;

  constructor(private http: HttpClient, private authService: AuthService) {} // Inject AuthService

  // Helper method to create headers with Bearer Token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Retrieve the token using AuthService
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  createTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, transaction, {
      headers: this.getAuthHeaders(),
    });
  }

  getTransactions(userId: number): Observable<Transaction[]> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<Transaction[]>(`${this.baseUrl}/`, {
      headers: this.getAuthHeaders(),
      params,
    });
  }
}