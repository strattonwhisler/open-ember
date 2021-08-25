import { Injectable } from '@angular/core';
import { IAutoEntityService } from '@briebug/ngrx-auto-entity';
import { Device } from './device.model';


@Injectable()
export class DeviceService implements IAutoEntityService<Device> {
}
