import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsComponent } from './transactions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TransactionsComponent, HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sidebar component', () => {
    const sidebarElement = fixture.debugElement.query(By.css('app-sidebar'));
    expect(sidebarElement).toBeTruthy();
  });

  it('should render the transaction form with required fields', () => {
    const dateField = fixture.debugElement.query(By.css('input[formControlName="date"]'));
    const typeField = fixture.debugElement.query(By.css('mat-select[formControlName="type"]'));
    const amountField = fixture.debugElement.query(By.css('input[formControlName="amount"]'));
    const categoryField = fixture.debugElement.query(By.css('mat-select[formControlName="category"]'));

    expect(dateField).toBeTruthy();
    expect(typeField).toBeTruthy();
    expect(amountField).toBeTruthy();
    expect(categoryField).toBeTruthy();
  });

  it('should have an invalid form when fields are empty', () => {
    expect(component.transactionForm.valid).toBeFalse();
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

  it('should display an error when the amount is less than or equal to 0', () => {
    const amountField = component.transactionForm.get('amount');
    amountField?.setValue(-10);
    expect(amountField?.hasError('min')).toBeTrue();
  });

  it('should call createTransaction() when the form is submitted', () => {
    spyOn(component, 'createTransaction');
    component.transactionForm.setValue({
      date: '2023-01-01',
      type: 'receive',
      amount: 100,
      category: 'Salary',
    });

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    expect(component.createTransaction).toHaveBeenCalled();
  });

  it('should display a success message after transaction creation', () => {
    component.successMessage = 'Transaction created successfully!';
    fixture.detectChanges();

    const successMessage = fixture.debugElement.query(By.css('.success-message')).nativeElement;
    expect(successMessage.textContent).toContain('Transaction created successfully!');
  });
});