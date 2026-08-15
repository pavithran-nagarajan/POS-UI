import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface SummaryCard {
  label: string;
  value: string | number;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = true;
  cards: SummaryCard[] = [];

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Replace with a real API call via a DashboardService
    setTimeout(() => {
      this.cards = [
        { label: 'Active Users', value: 1284, icon: '👥' },
        { label: 'Revenue', value: '$24,500', icon: '💰' },
        { label: 'Open Tickets', value: 12, icon: '🎫' },
        { label: 'Uptime', value: '99.9%', icon: '⚡' }
      ];
      this.loading = false;
    }, 500);
  }

  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}