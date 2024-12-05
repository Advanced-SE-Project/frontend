import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
        MatListModule,
    ],
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss'
})

export class TransactionsComponent implements OnInit {
  transactionForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  createTransaction(): void {
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;
  
      const rawDate: Date = transactionData.date;
  
      const day = String(rawDate.getDate()).padStart(2, '0');
      const month = String(rawDate.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
      const year = rawDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
  
      transactionData.date = formattedDate;
  
      // For now, add a hardcoded userId
      transactionData.userId = 1;
  
      this.transactionService.createTransaction(transactionData).subscribe({
        next: () => {
          this.successMessage = 'Transaction saved successfully!';
          this.transactionForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error saving transaction:', err.message);
        },
      });
    }
  }  
}