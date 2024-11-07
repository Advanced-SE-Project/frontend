import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SidebarComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatListModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})

export class TransactionsComponent {
  transactionForm: FormGroup;
  transactions$: Observable<any[]>;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      date: '',
      type: '',
      amount: '',
      category: ''
    });
    this.transactions$ = this.fetchTransactions();
  }

  fetchTransactions(): Observable<any[]> {
    return this.http.get<any[]>('/api/transactions');
  }

  createTransaction() {
    if (this.transactionForm.valid) {
      this.http.post('/api/transactions', this.transactionForm.value).subscribe({
        next: result => console.log('Transaction Created', result),
        error: error => console.error('There was an error!', error)
      });
    }
  }

  updateTransaction(id: number) {
    this.http.put(`/api/transactions/${id}`, this.transactionForm.value).subscribe({
      next: result => console.log('Transaction Updated', result),
      error: error => console.error('There was an error!', error)
    });
  }

  deleteTransaction(id: number) {
    this.http.delete(`/api/transactions/${id}`).subscribe({
      next: result => console.log('Transaction Deleted', result),
      error: error => console.error('There was an error!', error)
    });
  }
}
