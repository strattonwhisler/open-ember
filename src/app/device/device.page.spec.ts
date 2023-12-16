import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { expect } from 'chai';
import { DevicePage } from './device.page';
import { DeviceFacade } from '~domain/device';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialDeviceState } from '~domain/device/device.state';

describe('DevicePage', () => {
  let component: DevicePage;
  let fixture: ComponentFixture<DevicePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DeviceFacade,
        provideMockStore({ initialState: { device: initialDeviceState } }),
      ],
      imports: [RouterTestingModule, IonicModule.forRoot(), DevicePage],
    }).compileComponents();

    fixture = TestBed.createComponent(DevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).to.be.ok();
  });
});
