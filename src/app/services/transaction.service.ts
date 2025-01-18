import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:5000/transaction-service/api/transactions';

  constructor(private http: HttpClient) {}

  createTransaction(transaction: any): Observable<any> {
    return this.http.post(this.baseUrl, transaction);
  }

  // Method to fetch user balance
  getUserBalance(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/balance`);
  }

  // Method to fetch user transactions
  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/history`);
  }
}