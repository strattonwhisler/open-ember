export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export const asRgbaString = (color: Color): string =>
  `rgba(${color.r},${color.g},${color.b},${color.a / 255})`;

const invert = (channel: number): number => Math.abs(channel - 255);

export const invertedGrayscale = (color: Color): Color => {
  const gray = (color.r + color.g + color.b) / 3;
  const igray = invert(gray);

  return { r: igray, g: igray, b: igray, a: color.a };
}

export const inverted = (color: Color): Color => ({
  r: invert(color.r),
  g: invert(color.g),
  b: invert(color.b),
  a: color.a
});

