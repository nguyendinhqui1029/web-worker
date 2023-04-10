import { CalculateHelper } from './helper/calculate.helper';
/// <reference lib="webworker" />

onmessage = async (event) => {
  const { eventName, number } = event.data
  if (eventName === 'calculate') {
    postMessage(await CalculateHelper.doubleNumber(number));
  }
}