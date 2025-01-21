import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule], // Include RouterTestingModule for routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app logo and title', () => {
    const logoElement = fixture.debugElement.query(By.css('.sidenav-logo'));
    const titleElement = fixture.debugElement.query(By.css('.sidenav-title'));

    expect(logoElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent).toContain('Personal Budget');
  });

  it('should render the correct number of menu items', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('mat-list-item'));
    expect(menuItems.length).toBe(6); // Dashboard, Transactions, Analytics, Support, Settings, Logout
  });

  it('should render correct labels for each menu item', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('mat-list-item span'));
    const labels = menuItems.map(item => item.nativeElement.textContent.trim());

    expect(labels).toEqual(['Dashboard', 'Transactions', 'Analytics', 'Support', 'Settings', 'Logout']);
  });

  it('should render correct router links for each menu item', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('a[routerLink]'));
    const links = menuItems.map(item => item.attributes['ng-reflect-router-link']);

    expect(links).toEqual(['/dashboard', '/transactions', '/analytics', '/support', '/settings', '/log-in']);
  });
});