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
import { AuthService } from '../../services/auth.service';

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
  errorMessage: string = '';

  receiveCategories = ['Salary', 'Investments', 'Gifts', 'Refunds', 'Other'];
  spentCategories = ['Groceries', 'Entertainment', 'Utilities', 'Rent', 'Other'];
  filteredCategories: string[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private authService: AuthService // Inject AuthService here
  ) {
    this.transactionForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Listen for changes in the "type" field to update category options
    this.transactionForm.get('type')?.valueChanges.subscribe((type: string) => {
      if (type === 'receive') {
        this.filteredCategories = this.receiveCategories;
      } else if (type === 'spent') {
        this.filteredCategories = this.spentCategories;
      } else {
        this.filteredCategories = [];
      }

      // Reset category field when type changes
      this.transactionForm.get('category')?.reset();
    });
  }

  createTransaction(): void {
    console.log('createTransaction() triggered'); // Debug log
    console.log('Form validity:', this.transactionForm.valid); // Debug log
    console.log('Form value:', this.transactionForm.value); // Debug log
  
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;
  
      // Format the date as YYYY-MM-DD
      const rawDate: Date = transactionData.date;
      transactionData.date = rawDate.toISOString().split('T')[0];
  
      // Dynamically fetch the userId
      const userId = this.authService.getUserId();
      if (!userId) {
        this.errorMessage = 'User ID not found. Please log in again.';
        console.error(this.errorMessage); // Debug log
        return;
      }
  
      transactionData.userId = userId;
  
      console.log('Transaction data being sent:', transactionData); // Debug log
  
      // Send transaction to the backend
      this.transactionService.createTransaction(transactionData).subscribe({
        next: () => {
          this.successMessage = 'Transaction saved successfully!';
          this.errorMessage = '';
  
          // Reset the form and clear validation styles
          this.transactionForm.reset();
          this.transactionForm.markAsPristine();
          this.transactionForm.markAsUntouched();
  
          // Explicitly reset the validation state of each control
          Object.keys(this.transactionForm.controls).forEach((controlName) => {
            const control = this.transactionForm.get(controlName);
            control?.setErrors(null);
          });
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error saving transaction:', err.message);
          this.errorMessage = 'Failed to save transaction. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out all fields correctly.';
    }
  }  
  
}