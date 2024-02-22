import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signal',
    loadChildren: () =>
      import('./components/signal/signal.routes').then(
        (mod) => mod.SIGNAL_ROUTES
      ),
  },
  { path: '**', redirectTo: 'signal/demo' },
];
