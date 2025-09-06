import { Routes } from '@angular/router';
import { canActivateAuth } from './shared/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/landing.component').then(m => m.LandingComponent)},
  { path: 'login', loadComponent: () => import('./pages/login.component').then(m => m.LoginComponent)},
  { path: 'flight', canActivate: [canActivateAuth],
    loadComponent: () => import('./pages/flight-form.component').then(m => m.FlightFormComponent)
  },
  { path: 'done', canActivate: [canActivateAuth],
    loadComponent: () => import('./pages/done.component').then(m => m.DoneComponent)
  },
  { path: '**', redirectTo: '' }
];
