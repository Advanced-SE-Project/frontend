import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import { ChartData } from 'chart.js';

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService {
    private baseUrl = `${environment.apiBaseUrl}/analytics-service/analytics`;

    constructor(private http: HttpClient, private authService: AuthService) { }

    // Helper method to create headers with Bearer Token
    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken(); // Retrieve the token using AuthService
        return new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });
    }

    // Fetch line chart data
    getLineChart(userId: number, startMonth: string, endMonth: string): Observable<ChartData<'line'>> {
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

    // Fetch expense pie chart data
    getExpensePie(userId: number, startMonth: string, endMonth: string): Observable<ChartData<'pie'>> {
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

    // Fetch income pie chart data
    getIncomePie(userId: number, startMonth: string, endMonth: string): Observable<any> {
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

    // Fetch bar chart data
    getBarChart(
        userId: number,
        startMonth: string,
        endMonth: string,
        type: string,
        category: string
    ): Observable<ChartData<'bar'>> {
        const params = new HttpParams()
            .set('userId', userId.toString())
            .set('startMonth', startMonth)
            .set('endMonth', endMonth)
            .set('type', type)
            .set('category', category);

        return this.http.get<{ data: number[]; labels: string[] }>(`${this.baseUrl}/bar`, {
            headers: this.getAuthHeaders(),
            params,
        }).pipe(
            map(response => ({
                labels: response.labels,
                datasets: [
                    { data: response.data, label: `${type} - ${category}` }
                ]
            }))
        );
    }
}
