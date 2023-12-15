export const DISPATCH_FALSE = {
  dispatch: false
};

export const timeout = (time: number) => new Promise<void>(resolve => setTimeout(resolve, time));

export interface ErrorProps {
  error: any;
}

export interface CorrelationProps {
  correlationId: string;
}
