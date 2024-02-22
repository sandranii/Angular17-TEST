import { Routes } from '@angular/router';

export const SIGNAL_ROUTES: Routes = [
  {
    path: 'demo',
    loadComponent: () =>
      import('./signal.component').then((x) => x.SignalComponent),
    children: [
      {
        path: 'sample1',
        loadComponent: () =>
          import('./sample-1/sample-1.component').then(
            (x) => x.Sample1Component
          ),
      },
      {
        path: 'sample2',
        loadComponent: () =>
          import('./sample-2/sample-2.component').then(
            (x) => x.Sample2Component
          ),
      },
    ],
  },
];
