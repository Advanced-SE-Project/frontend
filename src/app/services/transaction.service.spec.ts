import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';
import { AuthService } from '../services/auth.service';
import { Transaction } from '../models/transaction.model';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    // Mock AuthService
    mockAuthService = jasmine.createSpyObj('AuthService', ['getToken']);
    mockAuthService.getToken.and.returnValue('mock-token'); // Mocked token

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TransactionService,
        { provide: AuthService, useValue: mockAuthService }, // Use mock AuthService
      ],
    }).compileComponents();

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should create a transaction', () => {
    const mockTransaction = {
      userId: 1,
      amount: 100,
      category: 'Food',
      type: 'Expense',
    };

    const mockResponse = { message: 'Transaction created successfully' };

    service.createTransaction(mockTransaction).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service['baseUrl']); // Match the exact URL
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    expect(req.request.body).toEqual(mockTransaction);
    req.flush(mockResponse);
  });

  it('should fetch transactions for a user', () => {
    const mockTransactions: Transaction[] = [
      { userId: 1, amount: 100, category: 'Food', type: 'Expense', date: '2023-01-01' },
      { userId: 1, amount: 50, category: 'Transport', type: 'Expense', date: '2023-01-02' },
    ];

    service.getTransactions(1).subscribe((transactions) => {
      expect(transactions).toEqual(mockTransactions);
    });

    const req = httpMock.expectOne(
      (req) =>
        req.url === service['baseUrl'] && req.params.get('userId') === '1'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');
    req.flush(mockTransactions);
  });
});
