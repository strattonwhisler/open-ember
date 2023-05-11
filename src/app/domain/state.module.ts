import { EnvironmentProviders, importProvidersFrom, Provider } from '@angular/core';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { provideEffects } from '@ngrx/effects';
import { ActionReducerMap, MetaReducer, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppState } from './app-state';
import { BleEffects, BleFacade, bleReducer, BleUiEffects } from './ble';
import {
  Device,
  DeviceEffects,
  DeviceFacade,
  DeviceIoEffects,
  DevicePersistenceEffects,
  deviceReducer,
  DeviceService,
  DeviceUiEffects
} from './device';
// import './remote-devtools';


const FACADES: Provider[] = [
  BleFacade,
  DeviceFacade
];

const EFFECTS = [
  BleEffects,
  BleUiEffects,
  DeviceEffects,
  DeviceIoEffects,
  DevicePersistenceEffects,
  DeviceUiEffects
];

const SERVICES: Provider[] = [
  DeviceService
];

const REDUCERS: ActionReducerMap<AppState> = {
  ble: bleReducer,
  device: deviceReducer
};

const META_REDUCERS: MetaReducer<AppState>[] = [
  //TODO:
];

const ENTITIES = [
  { provide: Device, useClass: DeviceService },
];

export const STATE_PROVIDERS: Array<Provider | EnvironmentProviders> = [
  provideStore(REDUCERS, {
    metaReducers: META_REDUCERS,
    runtimeChecks: {
      strictStateSerializability: true,
      // Auto-Entity includes classes in its actions:
      strictActionSerializability: false,
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictActionTypeUniqueness: true
    }
  }),
  provideEffects(EFFECTS),
  ...FACADES,
  ...ENTITIES,
  ...SERVICES,
  provideStoreDevtools(),
  importProvidersFrom(
    NgrxAutoEntityModule.forRoot()
  )
];
