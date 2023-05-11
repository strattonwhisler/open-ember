import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TemperaturePipe } from '~shared/temperature.pipe';


@Component({
  selector: 'oe-temperature',
  template: `
    <ion-text>{{ text }}
      <ion-icon name="thermometer-outline"></ion-icon>
      : {{ temperature | temperature }}</ion-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonicModule,
    TemperaturePipe
  ]
})
export class TemperatureComponent {
  @Input() temperature: number;
  @Input() text: string;
}
