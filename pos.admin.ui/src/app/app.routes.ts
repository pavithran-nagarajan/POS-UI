import { type Routes } from '@angular/router';

import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  // Public area — auth layout (blank chrome)
  {
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        loadComponent: () =>
          import('./features/login/login').then(m => m.LoginComponent),
        path: 'login'
      },
      {
        loadComponent: () =>
          import('./features/not-found/not-found').then(m => m.NotFoundComponent),
        path: 'not-found'
      }
    ],
    component: AuthLayout,
    path: ''
  },
  // Protected area — main layout (nav + sidebar)
  {
    children: [
      {
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(m => m.DashboardComponent),
        path: 'dashboard'
      },
      {
        loadComponent: () =>
          import('./features/configuration/company/company').then(m => m.Company),
        path: 'company'
      }
    ],
    component: MainLayout,
    path: ''
  },
  { path: '**', redirectTo: 'not-found' }
];