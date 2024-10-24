import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'login', component: LogInComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }