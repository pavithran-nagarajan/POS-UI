import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
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
          import('./pages/login/login').then(m => m.LoginComponent)
      },
      {
        path: 'not-found',
        loadComponent: () =>
          import('./pages/not-found/not-found').then(m => m.NotFoundComponent)
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
          import('./pages/dashboard/dashboard').then(m => m.DashboardComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];