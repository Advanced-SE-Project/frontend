import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { of } from 'rxjs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: '<div>Mock Sidebar</div>',
})
class MockSidebarComponent {}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  const mockTransactionService = {
    getTransactions: () => of([]), // Mock implementation
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, BrowserAnimationsModule, MockSidebarComponent, RouterTestingModule, HttpClientTestingModule, MatIconModule, MatListModule],
      providers: [
        CurrencyPipe,
        { provide: TransactionService, useValue: mockTransactionService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
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

  it('should display the current balance', () => {
    component.currentBalance = 1234.56;
    fixture.detectChanges();

    const balanceElement = fixture.debugElement.query(By.css('.balance')).nativeElement;
    expect(balanceElement.textContent).toContain('€1,234.56'); // Currency format in EUR
  });

  it('should render the correct number of received transactions', () => {
    component.receivedTransactions = [
      { date: '2023-01-01', amount: 100, type: 'credit', category: 'Salary', userId: 1 },
      { date: '2023-02-01', amount: 200, type: 'credit', category: 'Bonus', userId: 1 },
    ];
    fixture.detectChanges();
  
    const receivedItems = fixture.debugElement.queryAll(By.css('.transactions-column:nth-child(1) mat-list-item'));
    expect(receivedItems.length).toBe(2);
    expect(receivedItems[0].nativeElement.textContent).toContain('2023-01-01');
    expect(receivedItems[0].nativeElement.textContent).toContain('€100.00');
  });
  
  it('should render the correct number of spent transactions', () => {
    component.spentTransactions = [
      { date: '2023-03-01', amount: 50, type: 'debit', category: 'Food', userId: 1 },
      { date: '2023-04-01', amount: 150, type: 'debit', category: 'Rent', userId: 1 },
    ];
    fixture.detectChanges();
  
    const spentItems = fixture.debugElement.queryAll(By.css('.transactions-column:nth-child(2) mat-list-item'));
    expect(spentItems.length).toBe(2);
    expect(spentItems[1].nativeElement.textContent).toContain('2023-04-01');
    expect(spentItems[1].nativeElement.textContent).toContain('€150.00');
  }); 
});