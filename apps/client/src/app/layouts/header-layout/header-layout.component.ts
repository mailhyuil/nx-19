import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HeaderLayoutComponent {}
