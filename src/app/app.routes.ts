// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./components/transactions/transactions.component').then(
        (m) => m.TransactionsComponent
      ),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./components/analytics/analytics.component').then((m) => m.AnalyticsComponent),
  },
  {
    path: 'support',
    loadComponent: () =>
      import('./components/support/support.component').then((m) => m.SupportComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./components/settings/settings.component').then((m) => m.SettingsComponent),
  },
  {
    path: 'log-in',
    loadComponent: () =>
      import('./components/log-in/log-in.component').then((m) => m.LoginComponent),
  },
  {
    path: 'create-account',
    loadComponent: () =>
      import('./components/create-account/create-account.component').then(
        (m) => m.CreateAccountComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/about',
  },
];
