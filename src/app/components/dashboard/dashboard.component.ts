import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TransactionService } from '../../services/transaction.service';

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
    currentBalance: number = 0; // Define the current balance
    receivedTransactions: any[] = []; // Define the received transactions array
    spentTransactions: any[] = []; // Define the spent transactions array
  
    constructor(private transactionService: TransactionService) {}
  
    ngOnInit(): void {
      this.fetchUserBalance();
      this.fetchTransactionHistory();
    }
  
    fetchUserBalance(): void {
      this.transactionService.getUserBalance().subscribe({
        next: (balance: number) => {
          this.currentBalance = balance; // Assign fetched balance
        },
        error: (err) => {
          console.error('Error fetching balance:', err.message);
        }
      });
    }
  
    fetchTransactionHistory(): void {
      this.transactionService.getTransactions().subscribe({
        next: (transactions: any[]) => {
          // Filter transactions into received and spent
          this.receivedTransactions = transactions.filter(t => t.type === 'receive');
          this.spentTransactions = transactions.filter(t => t.type === 'spend');
        },
        error: (err) => {
          console.error('Error fetching transactions:', err.message);
        }
      });
    }
  }