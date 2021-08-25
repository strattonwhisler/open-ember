import { registerPlugin } from '@capacitor/core';


export interface EchoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Echo: EchoPlugin = registerPlugin('Echo');

export default Echo;
