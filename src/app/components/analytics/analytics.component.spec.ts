import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsComponent } from './analytics.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsComponent, FormsModule], // Include FormsModule for ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the sidebar component', () => {
    const sidebarElement = fixture.debugElement.nativeElement.querySelector('app-sidebar');
    expect(sidebarElement).toBeTruthy();
  });

  it('should call onDateRangeChange when the start month changes', () => {
    spyOn(component, 'onDateRangeChange');
    const startMonthInput = fixture.debugElement.query(By.css('#startMonth')).nativeElement;
    startMonthInput.value = '2023-01';
    startMonthInput.dispatchEvent(new Event('change'));

    expect(component.onDateRangeChange).toHaveBeenCalled();
  });

  it('should call onDateRangeChange when the end month changes', () => {
    spyOn(component, 'onDateRangeChange');
    const endMonthInput = fixture.debugElement.query(By.css('#endMonth')).nativeElement;
    endMonthInput.value = '2023-12';
    endMonthInput.dispatchEvent(new Event('change'));

    expect(component.onDateRangeChange).toHaveBeenCalled();
  });

  it('should render all categories in the dropdown', () => {
    component.categories = ['Category 1', 'Category 2', 'Category 3'];
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('#categorySelect option'));
    expect(options.length).toBe(3);
    expect(options[0].nativeElement.textContent).toBe('Category 1');
    expect(options[1].nativeElement.textContent).toBe('Category 2');
    expect(options[2].nativeElement.textContent).toBe('Category 3');
  });

  it('should call onCategoryChange when the category changes', () => {
    spyOn(component, 'onCategoryChange');
    const categorySelect = fixture.debugElement.query(By.css('#categorySelect')).nativeElement;
    categorySelect.value = 'Category 1';
    categorySelect.dispatchEvent(new Event('change'));

    expect(component.onCategoryChange).toHaveBeenCalled();
  });

  it('should define chart data and options for all charts', () => {
    expect(component.incomeAndExpenseLineChartData).toBeDefined();
    expect(component.incomeAndExpenseLineChartOptions).toBeDefined();
    expect(component.expensesInCategoryBarChartData).toBeDefined();
    expect(component.expensesInCategoryBarChartOptions).toBeDefined();
    expect(component.expenseCategoriesPieChartData).toBeDefined();
    expect(component.expenseCategoriesPieChartOptions).toBeDefined();
    expect(component.incomeCategoriesPieChartData).toBeDefined();
    expect(component.incomeCategoriesPieChartOptions).toBeDefined();
  });
});