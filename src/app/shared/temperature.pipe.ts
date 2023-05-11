import { TemperatureScale } from './temperature-scale.enum';
import { Pipe, PipeTransform } from '@angular/core';
import { temperatureScale, toFahrenheit } from '~shared/temperature.utils';


@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(temp: number): string {
    return temperatureScale === TemperatureScale.Fahrenheit
      ? `${toFahrenheit(temp).toFixed(0)}℉`
      : `${temp.toFixed(1)}℃`;
  }
}
