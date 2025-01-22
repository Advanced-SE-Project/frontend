import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { AuthService } from '../../services/auth.service';

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
  currentBalance = 0; // Dynamically calculated balance
  receivedTransactions: Transaction[] = []; // Transactions of type 'receive'
  spentTransactions: Transaction[] = []; // Transactions of type 'spent'
  errorMessage = ''; // Error message if transactions fail to load

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    // Retrieve userId from AuthService
    const userId = this.authService.getUserId();
    console.log('Fetched userId:', userId); // Debug log

    if (!userId) {
      this.errorMessage = 'User ID not found. Please log in again.';
      console.error(this.errorMessage); // Debug log
      return;
    }

    // Fetch transactions for the logged-in user
    this.transactionService.getTransactions(userId).subscribe({
      next: (transactions) => {
        console.log('Fetched transactions:', transactions); // Debug log
        this.receivedTransactions = transactions.filter((t) => t.type === 'receive');
        this.spentTransactions = transactions.filter((t) => t.type === 'spent');
        const totalReceived = this.receivedTransactions.reduce((sum, t) => sum + t.amount, 0);
        const totalSpent = this.spentTransactions.reduce((sum, t) => sum + t.amount, 0);
        this.currentBalance = totalReceived - totalSpent;
      },
      error: (err) => {
        console.error('Error fetching transactions:', err);
        this.errorMessage = 'Failed to fetch transactions. Please try again.';
      },
    });
  }
}