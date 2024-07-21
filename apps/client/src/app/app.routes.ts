import { Route } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/home/home.component').then(
                (m) => m.HomeComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./pages/home/home.component').then(
                (m) => m.HomeComponent
              ),
          },
        ],
      },
      {
        path: 'payment',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/payment/payment.component').then(
                (m) => m.PaymentComponent
              ),
            children: [
              {
                path: 'escrow',
                loadComponent: () =>
                  import(
                    './pages/payment/components/form-escrow/form-escrow.component'
                  ).then((m) => m.FormEscrowComponent),
              },
            ],
          },
        ],
      },
    ],
  },
];
