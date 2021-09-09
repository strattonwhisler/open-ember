import { TemperatureScale } from '~shared/temperature-scale.enum';


export const temperatureScale: TemperatureScale = TemperatureScale.Celsius;

export const toFahrenheit = (celsius: number): number => (celsius * 1.8) + 32;
