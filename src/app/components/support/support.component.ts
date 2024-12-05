import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
    selector: 'app-support',
    imports: [
        CommonModule,
        RouterModule,
        SidebarComponent,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule
    ],
    templateUrl: './support.component.html',
    styleUrl: './support.component.scss'
})
export class SupportComponent {

}
