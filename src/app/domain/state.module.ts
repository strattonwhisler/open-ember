import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { ActionReducerMap, MetaReducer } from '@ngrx/store/src/models';
import { AppState } from './app-state';
import { Actions, EffectsModule } from '@ngrx/effects';
import { BleEffects, BleFacade, bleReducer } from './ble';
import { Device, DeviceEffects, DeviceFacade, DeviceIoEffects, deviceReducer, DeviceService } from './device';
// import './remote-devtools';


const FACADES = [
  BleFacade,
  DeviceFacade
];

const EFFECTS = [
  BleEffects,
  DeviceEffects,
  DeviceIoEffects
];

const SERVICES = [
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
    ...ENTITIES,
    ...SERVICES
  ]
})
export class StateModule {
  static forRoot(): ModuleWithProviders<StateModule> {
    return {
      ngModule: StateModule
    };
  }

  constructor(
    store$: Store,
    actions$: Actions,
    @Optional() @SkipSelf() parentModule?: StateModule
  ) {
    if (parentModule) {
      throw new Error('StateModule is already loaded. Import it in the AppModule only.');
    }

    actions$.subscribe(({ type, ...props }) => console.debug('Action:', type, props));
    store$.subscribe(store => console.debug('Store:', store));
  }
}
