import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { AnalyticsService } from '../../services/analytics.service';
import { FormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BarChartConfig, DoughnutChartConfig, LineChartConfig, PieChartConfig } from './analyticsCharts.config';

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
export class AnalyticsComponent implements OnInit {

  dateRangeChange$: Subject<void> = new Subject<void>();
  startMonth = '2025-01'; // Default start month
  endMonth = '2025-12';   // Default end month
  selectedCategory = 'Groceries'; // Default selected category
  categories: string[] = []; // List of categories

  // Chart Data
  public incomeAndExpenseLineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  public expensesInCategoryBarChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  public expenseCategoriesPieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  public incomeCategoriesPieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  
  public incomeAndExpenseLineChartOptions = LineChartConfig;
  public expensesInCategoryBarChartOptions = BarChartConfig;
  public expenseCategoriesPieChartOptions = PieChartConfig;
  public incomeCategoriesPieChartOptions = DoughnutChartConfig;

  constructor(private analyticsService: AnalyticsService) {
    this.dateRangeChange$
      .pipe(debounceTime(500))
      .subscribe(() => {
        this.fetchBarChartData();
      });
  }

  ngOnInit(): void {
    this.fetchBarChartData();
  }

  fetchBarChartData() {
    this.analyticsService.getAllChartData(this.startMonth, this.endMonth, this.selectedCategory).subscribe(data => {
      this.expensesInCategoryBarChartData = data.barChart;
      this.incomeAndExpenseLineChartData = data.lineChart;
      this.expenseCategoriesPieChartData = data.expensePie;
      this.incomeCategoriesPieChartData = data.incomePie;
      this.categories = data.expensePie.labels?.map(label => label + "") || [];
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
    this.analyticsService.getBarChart(this.startMonth, this.endMonth, this.selectedCategory).subscribe((data) => {
      this.expensesInCategoryBarChartData = data;
    });
  }
}