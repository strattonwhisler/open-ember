type uuid = `${string}-${string}-${string}-${string}-${string}`;

export namespace UUID {
  export const UNKNOWN_SERVICE: uuid = '0000180a-0000-1000-8000-00805f9b34fb';
  export const EMBER_SERVICE: uuid = 'fc543622-236c-4c94-8fa9-944a3e5353fa';

  export const TARGET_TEMP: uuid = 'fc540003-236c-4c94-8fa9-944a3e5353fa';
  export const LED_COLOR: uuid = 'fc540014-236c-4c94-8fa9-944a3e5353fa';
  export const CURRENT_TEMP: uuid = 'fc540002-236c-4c94-8fa9-944a3e5353fa';
  export const CURRENT_BAT: uuid = 'fc540007-236c-4c94-8fa9-944a3e5353fa';
}

export const NAME: string = 'Ember Ceramic Mug';
