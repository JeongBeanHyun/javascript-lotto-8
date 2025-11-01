import { ERROR_MESSAGE } from "./errorMessage";

class PurchaseService {
  static validateAmount(amount) {
    if (!Number.isInteger(amount) || amount <= 0) {
      throw new Error(ERROR_MESSAGE.INVALID_AMOUNT_POSITIVE);
    }
    if (amount % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.INVALID_AMOUNT_UNIT);
    }
    return amount;
  }

  static calculateLottoCount(amount) {
    return amount / 1000;
  }
}

export default PurchaseService;
