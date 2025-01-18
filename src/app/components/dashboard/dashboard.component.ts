import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        SidebarComponent,
        MatListModule,
        MatIconModule,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentBalance: number = 0; // Dynamically calculated balance
  receivedTransactions: Transaction[] = []; // Transactions of type 'receive'
  spentTransactions: Transaction[] = []; // Transactions of type 'spent'

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    this.transactionService.getTransactions().subscribe({
      next: (transactions) => {
        // Categorize transactions by type
        this.receivedTransactions = transactions.filter((t) => t.type === 'receive');
        this.spentTransactions = transactions.filter((t) => t.type === 'spent');

        // Calculate the balance
        const totalReceived = this.receivedTransactions.reduce((sum, t) => sum + t.amount, 0);
        const totalSpent = this.spentTransactions.reduce((sum, t) => sum + t.amount, 0);

        this.currentBalance = totalReceived - totalSpent;
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
        alert('Failed to fetch transactions. Please log in again.');
      },
    });
  }
}