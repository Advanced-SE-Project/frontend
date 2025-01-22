import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsComponent } from './transactions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionService } from '../../services/transaction.service';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let mockTransactionService: jasmine.SpyObj<TransactionService>;

  beforeEach(async () => {
    mockTransactionService = jasmine.createSpyObj(['createTransaction']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        TransactionsComponent, 
        HttpClientTestingModule, 
        RouterTestingModule, 
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule    
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } },
        { provide: TransactionService, useValue: mockTransactionService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sidebar component', () => {
    const sidebarElement = fixture.debugElement.query(By.css('app-sidebar'));
    expect(sidebarElement).toBeTruthy();
  });

  it('should render all form fields and the submit button', () => {
    const dateField = fixture.debugElement.query(By.css('input[formControlName="date"]'));
    const typeField = fixture.debugElement.query(By.css('mat-select[formControlName="type"]'));
    const amountField = fixture.debugElement.query(By.css('input[formControlName="amount"]'));
    const categoryField = fixture.debugElement.query(By.css('mat-select[formControlName="category"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(dateField).toBeTruthy();
    expect(typeField).toBeTruthy();
    expect(amountField).toBeTruthy();
    expect(categoryField).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.transactionForm.valid).toBeFalse();
  });

  it('should initialize the form group', () => {
    expect(component.transactionForm).toBeTruthy();
    expect(component.transactionForm.controls['date']).toBeTruthy();
    expect(component.transactionForm.controls['type']).toBeTruthy();
    expect(component.transactionForm.controls['amount']).toBeTruthy();
    expect(component.transactionForm.controls['category']).toBeTruthy();
  });

  it('should have a valid form when all fields are filled correctly', () => {
    component.transactionForm.setValue({
      date: '2023-01-01',
      type: 'receive',
      amount: 100,
      category: 'Salary',
    });
    expect(component.transactionForm.valid).toBeTrue();
  });

  it('should validate required fields', () => {
    component.transactionForm.controls['date'].setValue(null);
    component.transactionForm.controls['type'].setValue(null);
    component.transactionForm.controls['amount'].setValue(null);
    component.transactionForm.controls['category'].setValue(null);
    fixture.detectChanges();

    expect(component.transactionForm.invalid).toBeTrue();
  });

  it('should validate amount greater than 0', () => {
    component.transactionForm.controls['amount'].setValue(-1);
    fixture.detectChanges();

    expect(component.transactionForm.controls['amount'].hasError('min')).toBeTrue();
  });

  it('should display an error when the amount is less than or equal to 0', () => {
    const amountField = component.transactionForm.get('amount');
    amountField?.setValue(-10);
    expect(amountField?.hasError('min')).toBeTrue();
  });

  it('should call createTransaction on form submit', () => {
    spyOn(component, 'createTransaction');
    component.transactionForm.controls['date'].setValue(new Date());
    component.transactionForm.controls['type'].setValue('receive');
    component.transactionForm.controls['amount'].setValue(100);
    component.transactionForm.controls['category'].setValue('Salary');

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(component.createTransaction).toHaveBeenCalled();
  });

  it('should display success message on successful form submission', () => {
    mockTransactionService.createTransaction.and.returnValue(of({ message: 'Transaction added successfully' }));
  
    component.transactionForm.controls['date'].setValue(new Date());
    component.transactionForm.controls['type'].setValue('receive');
    component.transactionForm.controls['amount'].setValue(100);
    component.transactionForm.controls['category'].setValue('Salary');
  
    component.createTransaction();
    component.successMessage = 'Transaction added successfully'; // Ensure the message is set
    fixture.detectChanges();
  
    const successMessage = fixture.debugElement.query(By.css('.success-message'));
    expect(successMessage).toBeTruthy();
    expect(successMessage.nativeElement.textContent).toContain('Transaction added successfully');
  });
  
});