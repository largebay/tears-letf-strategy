import { FREDObservation, FREDObservationData, ACTION } from './types';

/**
 * Measures the most significant drop from a peak to a trough over a set period
 * @param observations - Array of observations
 * @param days - Number of days to calculate max drawdown
 * @returns - Max drawdown
 */
export function calculateMaxDrawdown(
  observations: FREDObservation[],
  days: number
): number {
  return observations
    .slice(0, observations.length - days)
    .reduce((maxDrawdown, obs, i) => {
      const current = parseFloat(obs.value);
      const future = parseFloat(observations[i + days].value);
      const drawdown = (current - future) / current;
      return Math.max(maxDrawdown, drawdown);
    }, 0);
}

/**
 * Check triggers to alert buy, sell, or hold
 * @param data - Data from St. Louis FRED API
 * @returns - Action to take
 */
export function checkTriggers(data: FREDObservationData) {
  const { observations } = data;

  // check if 200d max drawdown of @BAMLH0A0HYM2 is greater than 30%
  const maxDrawdown200d = calculateMaxDrawdown(observations, 200);

  if (maxDrawdown200d > 0.3) {
    return ACTION.BUY;
  }

  // check if 85d cumulative return of @BAMLH0A0HYM2 is greater than 15%
  const cumulativeReturn85d =
    (parseFloat(observations[observations.length - 1].value) -
      parseFloat(observations[observations.length - 85].value)) /
    parseFloat(observations[observations.length - 85].value);

  // check if current price of @BAMLH0A0HYM2 is greater than 330d MA
  const sum330d = observations.slice(-330).reduce((sum, obs) => {
    const value = parseFloat(obs.value);
    if (isNaN(value)) {
      return sum;
    }
    return sum + value;
  }, 0);

  const movingAverage330d = sum330d / 330;
  const currentPrice = parseFloat(observations[observations.length - 1].value);
  if (cumulativeReturn85d > 0.15 && currentPrice > movingAverage330d) {
    return ACTION.SELL;
  }
  return ACTION.HOLD;
}
