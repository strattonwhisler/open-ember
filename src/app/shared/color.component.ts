import { Component, Input } from '@angular/core';
import { asRgbaString, Color, invertedGrayscale } from './color.model';


@Component({
  selector: 'oe-color',
  template: `
    <svg style="width: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 2">
      <rect width="10" height="2" rx="0.25" [style.fill]="asRgbaString(color)"/>
      <text transform="translate(3.21 1.47)" style="font-size:1.2px;"
            [style.fill]="asRgbaString(inverted(color))">
        <tspan>{{ text }}</tspan>
      </text>
    </svg>
  `
})
export class ColorComponent {
  readonly asRgbaString = asRgbaString;
  readonly inverted = invertedGrayscale;

  @Input() color: Color;
  @Input() text: string;
}

@Component({
  selector: 'oe-color-dot',
  template: `
    <ion-text>
      <ion-icon name="color-filter-outline"></ion-icon>
      <svg style="height: 1em;" viewBox="0 0 1 1" xmlns="http://www.w3.org/2000/svg">
        <circle r="0.5" cx="0.5" cy="0.5" [style.fill]="asRgbaString(color)"/>
      </svg>
    </ion-text>
  `
})
export class ColorDotComponent {
  readonly asRgbaString = asRgbaString;

  @Input() color: Color;
}
