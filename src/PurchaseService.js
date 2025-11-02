import { ERROR_MESSAGE } from "./errorMessage.js";

class PurchaseService {
  static validateAmount(amount) {
    const number = Number(amount);
    if (!Number.isInteger(number) || number <= 0) {
      throw new Error(ERROR_MESSAGE.INVALID_AMOUNT_POSITIVE);
    }
    if (number % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.INVALID_AMOUNT_UNIT);
    }
    return number;
  }

  static calculateLottoCount(amount) {
    return Number(amount) / 1000;
  }
}

export default PurchaseService;
