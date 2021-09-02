import { TemperatureScale } from './temperature-scale.enum';
import { Pipe, PipeTransform } from '@angular/core';


const temperatureScale: TemperatureScale = TemperatureScale.Fahrenheit;

export const toFahrenheit = (celsius: number): number => (celsius * 1.8) + 32;

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
  transform(temp: number): string {
    return TemperatureScale.Fahrenheit === TemperatureScale.Fahrenheit
      ? `${toFahrenheit(temp).toFixed(0)}℉`
      : `${temp.toFixed(1)}℃`;
  }
}
