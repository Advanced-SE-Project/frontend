import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = `${environment.apiBaseUrl}/transaction-service/api/transactions`;

  constructor(private http: HttpClient) {}

  createTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, transaction);
  }

  getTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/`, {
      params: { userId: userId.toString() },
    });
  }
}