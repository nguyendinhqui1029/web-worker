export class CalculateHelper {
  static  async doubleNumber(number: number) {
    await CalculateHelper.customDelay(10000)
    return number*number;
  }

  static customDelay(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}