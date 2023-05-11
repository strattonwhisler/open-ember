import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DevicePage } from './device.page';

describe('DevicePage', () => {
  let component: DevicePage;
  let fixture: ComponentFixture<DevicePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), DevicePage]
}).compileComponents();

    fixture = TestBed.createComponent(DevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
