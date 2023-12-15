import { EnvironmentProviders, Provider } from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  RouteReuseStrategy,
  Routes,
  withDebugTracing,
  withPreloading
} from '@angular/router';
import { IonicRouteStrategy } from '@ionic/angular';


const APP_ROUTES: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: 'pairing',
    loadChildren: () => import('./pairing/pairing.routes').then(m => m.PAIRING_ROUTES)
  },
  {
    path: 'device',
    loadChildren: () => import('./device/device.routes').then(m => m.DEVICE_ROUTES)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

export const ROUTE_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  provideRouter(
    APP_ROUTES,
    withPreloading(PreloadAllModules),
    withDebugTracing()
  ),
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
];
