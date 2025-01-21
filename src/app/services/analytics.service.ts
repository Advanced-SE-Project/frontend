import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { ChartData } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private baseUrl = `${environment.apiBaseUrl}/analytics-service/analytics`;
  private userId: number | null = null;
  private type = 'Expense'; //Currently we only want to use Expenses

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  private ensureUserId(): number {
    if (!this.userId) {
      throw new Error('User ID is not available. Ensure user is logged in.');
    }
    return this.userId;
  }

  getLineChart(startMonth: string, endMonth: string): Observable<ChartData<'line'>> {
    const userId = this.ensureUserId();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('startMonth', startMonth)
      .set('endMonth', endMonth);

    return this.http.get<{
      expenseData: number[];
      incomeData: number[];
      labels: string[];
    }>(`${this.baseUrl}/line`, {
      headers: this.getAuthHeaders(),
      params,
    }).pipe(
      map(response => ({
        labels: response.labels,
        datasets: [
          { data: response.incomeData, label: 'Income' },
          { data: response.expenseData, label: 'Expenses' }
        ]
      }))
    );
  }

  getExpensePie(startMonth: string, endMonth: string): Observable<ChartData<'pie'>> {
    const userId = this.ensureUserId();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('startMonth', startMonth)
      .set('endMonth', endMonth);

    return this.http.get<{
      data: number[];
      labels: string[];
    }>(`${this.baseUrl}/pie/expense`, {
      headers: this.getAuthHeaders(),
      params,
    }).pipe(
      map(response => ({
        labels: response.labels,
        datasets: [
          { data: response.data }
        ]
      }))
    );
  }

  getIncomePie(startMonth: string, endMonth: string): Observable<any> {
    const userId = this.ensureUserId();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('startMonth', startMonth)
      .set('endMonth', endMonth);

    return this.http.get<{
      data: number[];
      labels: string[];
    }>(`${this.baseUrl}/pie/income`, {
      headers: this.getAuthHeaders(),
      params,
    }).pipe(
      map(response => ({
        labels: response.labels,
        datasets: [
          { data: response.data }
        ]
      }))
    );
  }

  getBarChart(
    startMonth: string,
    endMonth: string,
    category: string
  ): Observable<ChartData<'bar'>> {
    const userId = this.ensureUserId();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('startMonth', startMonth)
      .set('endMonth', endMonth)
      .set('type', this.type)
      .set('category', category);

    return this.http.get<{ data: number[]; labels: string[] }>(`${this.baseUrl}/bar`, {
      headers: this.getAuthHeaders(),
      params,
    }).pipe(
      map(response => ({
        labels: response.labels,
        datasets: [
          { data: response.data, label: `${category}` }
        ]
      }))
    );
  }


  getAllChartData(startMonth: string, endMonth: string, selectedCategory: string) {
    return forkJoin({
      barChart: this.getBarChart(startMonth, endMonth, selectedCategory),
      lineChart: this.getLineChart(startMonth, endMonth),
      expensePie: this.getExpensePie(startMonth, endMonth),
      incomePie: this.getIncomePie(startMonth, endMonth)
    });
  }
}
