import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

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
  // Line chart data, options, and configuration
  public lineChartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Income' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Expenses' }
    ]
  };

  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType: string = 'line'; // Define the chart type

  // Bar Chart
  public barChartData: ChartData<'bar'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{ data: [12, 19, 3, 5, 2, 3], label: 'Sales' }]
  };
  public barChartOptions: ChartOptions<'bar'> = { responsive: true };
  public barChartType = 'bar';
  public barChartLegend = true;

  // Pie Chart
  public pieChartData: ChartData<'pie'> = {
    labels: ['Food', 'Entertainment', 'Rent', 'Utilities'],
    datasets: [{ data: [300, 50, 100, 40] }]
  };
  public pieChartOptions: ChartOptions<'pie'> = { responsive: true };
  public pieChartType = 'pie';
  public pieChartLegend = true;

  // Doughnut Chart
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ['Housing', 'Transportation', 'Food', 'Savings'],
    datasets: [
      { data: [40, 20, 20, 20], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'] }
    ]
  };

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
  };

  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = true;
}