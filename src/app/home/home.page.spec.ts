import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { expect } from 'chai';
import { DeviceFacade } from '~domain/device';
import { provideMockStore } from '@ngrx/store/testing';
import { initialDeviceState } from '~domain/device/device.state';
import { BleFacade } from '~domain/ble';
import { initialBleState } from '~domain/ble/ble.state';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Subject } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
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
      imports: [RouterTestingModule, IonicModule.forRoot(), HomePage]
    }).compileComponents();

    actions$ = new Subject<Action>();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.be.ok();
  });
});
