import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SupportComponent } from './components/support/support.component';

export const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent},
  { path: 'transactions', component: TransactionsComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'support', component: SupportComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'create-account', component: CreateAccountComponent},
  { path: '**', redirectTo: '/about' } // Fallback for unknown routes
];