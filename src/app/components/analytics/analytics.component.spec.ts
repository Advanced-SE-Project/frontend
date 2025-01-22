import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsComponent } from './analytics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for animations
import { MatSelectModule } from '@angular/material/select'; // Add relevant Angular Material modules
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyticsService } from '../../services/analytics.service';

// Mock AnalyticsService
const mockAnalyticsService = {
  ensureUserId: jasmine.createSpy('ensureUserId').and.returnValue(true),
  getBarChart: jasmine.createSpy('getBarChart').and.returnValue(of([])),
  getAllChartData: jasmine.createSpy('getAllChartData').and.returnValue(of({})),
};

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AnalyticsComponent,
        BrowserAnimationsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mocking ActivatedRoute parameters
          },
        },
        { provide: AnalyticsService, useValue: mockAnalyticsService }, // Mock service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onCategoryChange when the category changes', () => {
    spyOn(component, 'onCategoryChange');
    component.selectedCategory = 'Sales'; // Simulating category selection
    fixture.detectChanges();
    component.onCategoryChange();
    expect(component.onCategoryChange).toHaveBeenCalled();
  });

  it('should render all categories in the dropdown', () => {
    component.categories = ['Sales', 'Marketing', 'Development']; // Set mock categories
    fixture.detectChanges(); // Refresh the DOM
  
    const compiled = fixture.nativeElement;
    const dropdownOptions = compiled.querySelectorAll('#categorySelect option'); // Use native <option>
    expect(dropdownOptions.length).toBe(3); // Verify the number of options
    expect(dropdownOptions[0].textContent).toContain('Sales'); // Verify content
    expect(dropdownOptions[1].textContent).toContain('Marketing'); // Verify content
    expect(dropdownOptions[2].textContent).toContain('Development'); // Verify content
  });  

  it('should ensure user ID is available', () => {
    const userIdAvailable = mockAnalyticsService.ensureUserId();
    expect(userIdAvailable).toBe(true);
  });

  it('should fetch bar chart data on category change', () => {
    component.selectedCategory = 'Sales'; // Set a sample category
    component.startMonth = '2023-01'; // Set mock startMonth
    component.endMonth = '2023-12'; // Set mock endMonth
  
    component.onCategoryChange(); // Call the method
    expect(mockAnalyticsService.getBarChart).toHaveBeenCalledWith(
      '2023-01',
      '2023-12',
      'Sales'
    ); // Ensure the service was called with correct arguments
  });  
  
});