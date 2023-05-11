import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Color } from './color.model';
import { IonicModule } from '@ionic/angular';
import { GrayscaleInvertPipe, RgbaPipe } from '~shared/color.pipe';


@Component({
  selector: 'oe-color',
  template: `
    <svg style="width: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 2">
      <rect width="10" height="2" rx="0.25" [style.fill]="color | rgba"/>
      <text transform="translate(3.21 1.47)" style="font-size:1.2px;"
            [style.fill]="color | grayscaleInvert | rgba">
        <tspan>{{ text }}</tspan>
      </text>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RgbaPipe,
    GrayscaleInvertPipe
  ]
})
export class ColorComponent {
  @Input() color: Color;
  @Input() text: string;
}

@Component({
  standalone: true,
  selector: 'oe-color-dot',
  template: `
    <ion-text>
      <ion-icon name="color-filter-outline"></ion-icon>
      <svg style="height: 1em;" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
        <circle r="0.5" cx="0.5" cy="0.5" [style.fill]="color | rgba"/>
      </svg>
    </ion-text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonicModule,
    RgbaPipe
  ]
})
export class ColorDotComponent {
  @Input() color: Color;
}
