import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderLayoutComponent } from '../header-layout/header-layout.component';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderLayoutComponent],
})
export class DefaultLayoutComponent {}
