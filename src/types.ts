export type FREDObservation = {
  realtime_start: string;
  realtime_end: string;
  date: string;
  value: string;
};

export type FREDObservationData = {
  realtime_start?: string;
  realtime_end?: string;
  observation_start: string;
  observation_end: string;
  units: string;
  output_type: number;
  file_type: string;
  order_by: string;
  sort_order: string;
  count: number;
  offset: number;
  limit: number;
  observations: FREDObservation[];
};

export enum ACTION {
  BUY = 'BUY',
  SELL = 'SELL',
  HOLD = 'HOLD',
}
