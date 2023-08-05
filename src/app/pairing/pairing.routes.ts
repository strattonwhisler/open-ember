import { Routes } from '@angular/router';
import { PairingPage } from './pairing.page';
import { PairingDetailsPage } from "./pairing-details.page";
import { initPairingDetailsResolver } from "./pairing-details.resolver";


export const PAIRING_ROUTES: Routes = [
  { path: '', component: PairingPage },
  {
    path: ':deviceId',
    component: PairingDetailsPage,
    resolve: {
      __init__: initPairingDetailsResolver
    }
  }
];
