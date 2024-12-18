import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private baseUrl = 'http://localhost:3000/api/transactions';

  constructor(private http: HttpClient) {}

  createTransaction(transaction: any): Observable<any> {
    return this.http.post(this.baseUrl, transaction);
  }
}