import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SupportComponent } from './components/support/support.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LogInComponent } from './components/log-in/log-in.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'support', component: SupportComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'log-in', component: LogInComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' } // Wildcard route for unknown paths
];