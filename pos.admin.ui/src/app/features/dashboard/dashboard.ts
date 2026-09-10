import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth';

interface SummaryCard {
  icon: string;
  label: string;
  value: number | string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'app-dashboard',
  standalone: true,
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  cards: SummaryCard[] = [];
  isLoading = true;

  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  onLogout(): void {
    this.auth.logout();
    void this.router.navigate(['/login']);
  }

  private loadDashboardData(): void {
    // Replace with a real API call via a DashboardService
    setTimeout(() => {
      this.cards = [
        { icon: '👥', label: 'Active Users', value: 1284 },
        { icon: '💰', label: 'Revenue', value: '$24,500' },
        { icon: '🎫', label: 'Open Tickets', value: 12 },
        { icon: '⚡', label: 'Uptime', value: '99.9%' },
      ];
      this.isLoading = false;
    }, 500);
  }
}
