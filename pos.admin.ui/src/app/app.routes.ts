import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  // Public area — auth layout (blank chrome)
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/login/login').then(m => m.LoginComponent)
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./features/not-found/not-found').then(m => m.NotFoundComponent)
      }
    ]
  },
  // Protected area — main layout (nav + sidebar)
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'company',
        loadComponent: () =>
          import('./features/configuration/company/company').then(m => m.Company)
      }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];