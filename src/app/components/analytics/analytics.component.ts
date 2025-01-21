import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { AnalyticsService } from '../../services/analytics.service';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SidebarComponent,
    BaseChartDirective,
    FormsModule
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  private dateRangeChange$: Subject<void> = new Subject<void>();
  startMonth: string = '2025-01'; // Default start month
  endMonth: string = '2025-12';   // Default end month
  selectedCategory: string = 'Groceries'; // Default selected category
  categories: string[] = []; // List of categories
  userId = 1;
  type = 'Expense';

  constructor(private analyticsService: AnalyticsService) {
    this.dateRangeChange$
      .pipe(debounceTime(500)) // Adjust debounce time as needed (in ms)
      .subscribe(() => {
        this.fetchBarChartData(); // Call your data-fetching logic here
      });
  }



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
    this.analyticsService.getBarChart(this.userId, this.startMonth, this.endMonth, this.type, this.selectedCategory).subscribe((data) => {
      this.expensesInCategoryBarChartData = data;
    });
    this.analyticsService.getLineChart(this.userId, this.startMonth, this.endMonth).subscribe((data) => {
      this.incomeAndExpenseLineChartData = data;
    });
    this.analyticsService.getExpensePie(this.userId, this.startMonth, this.endMonth).subscribe((data) => {
      this.expenseCategoriesPieChartData = data;
      if (data.labels) {
        this.categories = data.labels?.map(l => l + "")
      }
    });
    this.analyticsService.getIncomePie(this.userId, this.startMonth, this.endMonth).subscribe((data) => {
      this.incomeCategoriesPieChartData = data;
    });
  }

  onDateRangeChange(): void {
    const startYear = parseInt(this.startMonth.split('-')[0]);
    const endYear = parseInt(this.endMonth.split('-')[0]);
    if (startYear > 1900 && endYear < 3000) {
      this.dateRangeChange$.next();
    }
  }

  onCategoryChange(): void {
    this.analyticsService.getBarChart(this.userId, this.startMonth, this.endMonth, this.type, this.selectedCategory).subscribe((data) => {
      this.expensesInCategoryBarChartData = data;
    });
  }
}