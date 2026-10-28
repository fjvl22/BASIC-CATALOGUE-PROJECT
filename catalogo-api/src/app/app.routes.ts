import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./admin-dashboard').then((m) => m.AdminDashboard),
  },
  {
    path: 'products/new',
    loadComponent: () =>
      import('../product-create/product-create').then(
        (m) => m.ProductCreate,
      ),
  },
];