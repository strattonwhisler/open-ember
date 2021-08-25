import { Entity, Key } from '@briebug/ngrx-auto-entity';

@Entity({
  modelName: 'Device'
})
export class Device {
  @Key deviceId: string;
  name: string;
}
