import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PairingPage } from './pairing.page';
import { expect } from 'chai';
import { BleFacade } from '~domain/ble';
import { provideMockStore } from '@ngrx/store/testing';
import { initialBleState } from '~domain/ble/ble.state';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceFacade } from '~domain/device';
import { initialDeviceState } from '~domain/device/device.state';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { Action } from '@ngrx/store';

describe('PairingPage', () => {
  let component: PairingPage;
  let fixture: ComponentFixture<PairingPage>;
  let actions$: Subject<Action>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        BleFacade,
        DeviceFacade,
        provideMockStore({ initialState: {
            ble: initialBleState,
            device: initialDeviceState
          } }),
        provideMockActions(() => actions$)
      ],
      imports: [RouterTestingModule, IonicModule.forRoot(), PairingPage]
    }).compileComponents();

    actions$ = new Subject<Action>();

    fixture = TestBed.createComponent(PairingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.be.ok();
  });
});
