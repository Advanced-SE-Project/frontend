import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

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
});
