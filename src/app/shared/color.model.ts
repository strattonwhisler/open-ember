export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const asRgbaString = (color: Color): string =>
  `rgba(${color.r / 255},${color.g / 255},${color.b / 255},${color.a / 255})`;
