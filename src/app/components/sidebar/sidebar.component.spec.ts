import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct labels for each menu item', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Select all elements with the 'menu-label' class
    const menuLabels = Array.from(
      compiled.querySelectorAll('.menu-label')
    ).map((label) => label.textContent?.trim());

    // Assertions
    expect(menuLabels).toEqual([
      'Dashboard',
      'Transactions',
      'Analytics',
      'Support',
      'Settings',
      'Logout',
    ]);
  });

  it('should render the logo and title in the toolbar', () => {
    const logo = fixture.debugElement.query(By.css('.sidenav-logo'));
    const title = fixture.debugElement.query(By.css('.sidenav-title'));

    expect(logo).toBeTruthy();
    expect(logo.attributes['src']).toContain('assets/icons/logo.png');
    expect(title.nativeElement.textContent).toContain('Personal Budget');
  });

  it('should navigate to correct route on menu item click', () => {
    const routerLinks = fixture.debugElement.queryAll(By.directive(RouterTestingModule));
    const menuItems = fixture.debugElement.queryAll(By.css('a[mat-list-item]'));

    expect(menuItems[0].attributes['routerLink']).toBe('/dashboard');
    expect(menuItems[1].attributes['routerLink']).toBe('/transactions');
    expect(menuItems[2].attributes['routerLink']).toBe('/analytics');
    expect(menuItems[3].attributes['routerLink']).toBe('/support');
    expect(menuItems[4].attributes['routerLink']).toBe('/settings');
    expect(menuItems[5].attributes['routerLink']).toBe('/log-in');
  });

  it('should contain a mat-sidenav-container', () => {
    const sidenavContainer = fixture.debugElement.query(By.css('mat-sidenav-container'));
    expect(sidenavContainer).toBeTruthy();
  });
});
