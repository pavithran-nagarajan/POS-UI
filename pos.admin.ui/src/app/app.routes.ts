import { type Routes } from '@angular/router';

import { AuthLayout } from './layout/auth-layout/auth-layout';
import { MainLayout } from './layout/main-layout/main-layout';

function lazy<TModule, TExport>(
  loader: () => Promise<TModule>,
  pick: (m: TModule) => TExport
): () => Promise<TExport> {
  return async () => pick(await loader());
}

export const routes: Routes = [
  {
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        loadComponent: lazy(
          async () => import('./features/login/login'),
          m => m.LoginComponent
        ),
        path: 'login'
      },
      {
        loadComponent: lazy(
          async () => import('./features/not-found/not-found'),
          m => m.NotFoundComponent
        ),
        path: 'not-found'
      }
    ],
    component: AuthLayout,
    path: ''
  },
  {
    children: [
      {
        loadComponent: lazy(
          async () => import('./features/dashboard/dashboard'),
          m => m.DashboardComponent
        ),
        path: 'dashboard'
      },
      {
        loadComponent: lazy(
          async () => import('./features/configuration/company/company'),
          m => m.Company
        ),
        path: 'company'
      }
    ],
    component: MainLayout,
    path: ''
  },
  { path: '**', redirectTo: 'not-found' }
];