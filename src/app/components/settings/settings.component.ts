import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        SidebarComponent,
        FormsModule
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})

export class SettingsComponent {
  profileSettings = {
    username: '',
    email: '',
    password: ''
  };

  constructor() {}

  updateProfile() {
    // Implement functionality to update the profile
    console.log('Updating profile with:', this.profileSettings);
  }
}