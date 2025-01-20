import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    BaseChartDirective,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  constructor(private analyticsService: AnalyticsService) { }


  // Line chart
  public incomeAndExpenseLineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };
  public incomeAndExpenseLineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public incomeAndExpenseLineChartLegend = true;
  public incomeAndExpenseLineChartType = 'line';

  // Bar Chart
  public expensesInCategoryBarChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  public expensesInCategoryBarChartOptions: ChartOptions<'bar'> = { responsive: true };
  public expensesInCategoryBarChartType = 'bar';
  public expensesInCategoryBarChartLegend = true;

  // Pie Chart
  public expenseCategoriesPieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: []
  };
  public expenseCategoriesPieChartOptions: ChartOptions<'pie'> = { responsive: true };
  public expenseCategoriesPieChartLegend = true;

  // Doughnut Chart
  public incomeCategoriesPieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: []
  };
  public incomeCategoriesPieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public incomeCategoriesPieChartType = 'pie';
  public incomeCategoriesPieChartLegend = true;

  ngOnInit(): void {
    this.fetchBarChartData();
  }
  fetchBarChartData() {
    const userId = 1;
    const startMonth = '01-2025';
    const endMonth = '12-2025';
    const type = 'Expense';
    const category = 'Groceries';

    this.analyticsService.getBarChart(userId, startMonth, endMonth, type, category).subscribe((data) => {
      this.expensesInCategoryBarChartData = data;
    });
    this.analyticsService.getLineChart(userId, startMonth, endMonth).subscribe((data) => {
      this.incomeAndExpenseLineChartData = data;
    });
    this.analyticsService.getExpensePie(userId, startMonth, endMonth).subscribe((data) => {
      this.expenseCategoriesPieChartData = data;
    });
    this.analyticsService.getIncomePie(userId, startMonth, endMonth).subscribe((data) => {
      this.incomeCategoriesPieChartData = data;
    });
  }
}