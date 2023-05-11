import { Pipe, PipeTransform } from '@angular/core';
import { asRgbaString, Color, invertedGrayscale } from '~shared/color.model';


@Pipe({
  name: 'rgba',
  standalone: true
})
export class RgbaPipe implements PipeTransform {
  transform(color: Color): string {
    return asRgbaString(color);
  }
}

@Pipe({
  name: 'grayscaleInvert',
  standalone: true
})
export class GrayscaleInvertPipe implements PipeTransform {
  transform(color: Color): Color {
    return invertedGrayscale(color);
  }
}
