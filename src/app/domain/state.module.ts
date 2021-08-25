import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, MetaReducer } from '@ngrx/store/src/models';
import { AppState } from './app-state';
import { BleEffects } from './ble/ble.effects';
import { Actions, EffectsModule } from '@ngrx/effects';
import { BleFacade } from './ble/ble.facade';
import { Device } from './device/device.model';
import { DeviceService } from './device/device.service';
import { deviceReducer } from './device/device.state';
import { DeviceFacade } from './device/device.facade';
import { DeviceEffects } from './device/device.effects';
import { bleReducer } from './ble/ble.state';
// import './remote-devtools';


const FACADES = [
  BleFacade,
  DeviceFacade
];

const EFFECTS = [
  BleEffects,
  DeviceEffects
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

@NgModule({
  imports: [
    StoreModule.forRoot(REDUCERS, {
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
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(EFFECTS),
    NgrxAutoEntityModule.forRoot()
  ],
  providers: [
    ...FACADES,
    ...ENTITIES
  ]
})
export class StateModule {
  constructor(store$: Store, actions$: Actions) {
    actions$.subscribe(({ type, ...props }) => console.debug('Action:', type, props));
    store$.subscribe(store => console.debug('Store:', store));
  }
}
