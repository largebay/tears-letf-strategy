import { describe, it, expect } from '@jest/globals';
import { ACTION } from '../src/types';
import {
  calculateMaxDrawdown,
  checkTriggers,
} from '../src/tears_letf_strategy';

describe('calculateMaxDrawdown', () => {
  it('should calculate the maximum drawdown correctly', () => {
    const observations = Array(330)
      .fill({
        date: '2023-01-01',
        value: '100',
        realtime_start: '',
        realtime_end: '',
      })
      .concat([
        {
          date: '2023-01-02',
          value: '90',
          realtime_start: '',
          realtime_end: '',
        },
        {
          date: '2023-01-03',
          value: '80',
          realtime_start: '',
          realtime_end: '',
        },
        {
          date: '2023-01-04',
          value: '70',
          realtime_start: '',
          realtime_end: '',
        },
        {
          date: '2023-01-05',
          value: '60',
          realtime_start: '',
          realtime_end: '',
        },
      ]);
    const days = 2;
    const result = calculateMaxDrawdown(observations, days);
    expect(result).toBe(0.25);
  });
});

describe('checkTriggers', () => {
  it('should return BUY when max drawdown is greater than 30%', () => {
    const data = {
      observation_start: '',
      observation_end: '',
      units: '',
      output_type: 0,
      file_type: '',
      order_by: '',
      sort_order: '',
      count: 0,
      offset: 0,
      limit: 0,
      observations: Array(330)
        .fill({
          date: '2023-01-01',
          value: '100',
          realtime_start: '',
          realtime_end: '',
        })
        .concat([
          {
            date: '2023-01-02',
            value: '60',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-03',
            value: '60',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-04',
            value: '60',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-05',
            value: '60',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-06',
            value: '60',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-07',
            value: '60',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-08',
            value: '60',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-09',
            value: '60',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-10',
            value: '60',
            realtime_start: '',
            realtime_end: '',
          },
        ]),
    };
    const result = checkTriggers(data);
    expect(result).toBe(ACTION.BUY);
  });

  it('should return SELL when cumulative return is greater than 15% and current price is greater than 330d MA', () => {
    const data = {
      observation_start: '',
      observation_end: '',
      units: '',
      output_type: 0,
      file_type: '',
      order_by: '',
      sort_order: '',
      count: 0,
      offset: 0,
      limit: 0,
      observations: Array(330)
        .fill({
          date: '2023-01-01',
          value: '100',
          realtime_start: '',
          realtime_end: '',
        })
        .concat([
          {
            date: '2023-01-02',
            value: '116',
            realtime_start: '',
            realtime_end: '',
          },
        ]),
    };
    const result = checkTriggers(data);
    expect(result).toBe(ACTION.SELL);
  });

  it('should return HOLD when no conditions are met', () => {
    const data = {
      observation_start: '',
      observation_end: '',
      units: '',
      output_type: 0,
      file_type: '',
      order_by: '',
      sort_order: '',
      count: 0,
      offset: 0,
      limit: 0,
      observations: Array(330)
        .fill({
          date: '2023-01-01',
          value: '100',
          realtime_start: '',
          realtime_end: '',
        })
        .concat([
          {
            date: '2023-01-02',
            value: '100',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-03',
            value: '100',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-04',
            value: '100',
            realtime_start: '',
            realtime_end: '',
          },
          {
            date: '2023-01-05',
            value: '100',
            realtime_start: '',
            realtime_end: '',
          },
        ]),
    };
    const result = checkTriggers(data);
    expect(result).toBe(ACTION.HOLD);
  });
});
