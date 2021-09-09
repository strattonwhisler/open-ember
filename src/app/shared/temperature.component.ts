import { Component, Input } from '@angular/core';


@Component({
  selector: 'oe-temperature',
  template: `
    <ion-text>{{ text }}
      <ion-icon name="thermometer-outline"></ion-icon>
      : {{ temperature | temperature }}</ion-text>
  `
})
export class TemperatureComponent {
  @Input() temperature: number;
  @Input() text: string;
}
