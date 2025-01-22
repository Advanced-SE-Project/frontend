import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { AnalyticsService } from './analytics.service';
import { AuthService } from '../services/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

describe('AnalyticsService', () => {
    let service: AnalyticsService;
    let httpMock: HttpTestingController;
    let mockAuthService: jasmine.SpyObj<AuthService>;

    beforeEach(() => {
        mockAuthService = jasmine.createSpyObj('AuthService', ['getToken', 'getUserId']);
        mockAuthService.getUserId.and.returnValue(1); // Mocked userId
        mockAuthService.getToken.and.returnValue('mock-token'); // Mocked token

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                provideAnimations(),
                AnalyticsService,
                { provide: AuthService, useValue: mockAuthService },
            ],
        }).compileComponents();

        service = TestBed.inject(AnalyticsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
      });

    it('should fetch line chart data', () => {
        const mockResponse = {
            expenseData: [200, 300],
            incomeData: [500, 700],
            labels: ['January', 'February'],
        };

        const expectedData = {
            labels: ['January', 'February'],
            datasets: [
                { data: [500, 700], label: 'Income' },
                { data: [200, 300], label: 'Expenses' },
            ],
        };

        service.getLineChart('2023-01', '2023-02').subscribe(data => {
            expect(data).toEqual(expectedData);
        });

        const req = httpMock.expectOne((req) =>
            req.url === `${service['baseUrl']}/line` &&
            req.params.get('userId') === '1' &&
            req.params.get('startMonth') === '2023-01' &&
            req.params.get('endMonth') === '2023-02'
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });     

    it('should fetch bar chart data', () => {
        const mockResponse = {
          labels: ['Food', 'Transport', 'Utilities'],
          data: [100, 50, 70],
        };
      
        const expectedData = {
          labels: ['Food', 'Transport', 'Utilities'],
          datasets: [{ data: [100, 50, 70], label: 'category' }], // Match actual service logic
        };
      
        service.getBarChart('2023-01', '2023-02', 'category').subscribe((data) => {
          expect(data).toEqual(expectedData);
        });
      
        const req = httpMock.expectOne((req) =>
          req.url === `${service['baseUrl']}/bar` &&
          req.params.get('userId') === '1' &&
          req.params.get('startMonth') === '2023-01' &&
          req.params.get('endMonth') === '2023-02'
        );
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
      });          

    it('should handle error response for line chart data', () => {
        service.getLineChart('2023-01', '2023-02').subscribe(
            () => fail('Expected an error, but got success response'),
            (error) => {
                expect(error.status).toBe(500);
                expect(error.statusText).toBe('Internal Server Error');
            }
        );
    
        const req = httpMock.expectOne((req) =>
            req.url === `${service['baseUrl']}/line` &&
            req.params.get('userId') === '1' &&
            req.params.get('startMonth') === '2023-01' &&
            req.params.get('endMonth') === '2023-02'
        );
        req.flush({}, { status: 500, statusText: 'Internal Server Error' });
    }); 
     
});
