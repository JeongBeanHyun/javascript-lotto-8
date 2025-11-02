import { ERROR_MESSAGE } from "../src/constants/ErrorMessage";
import PurchaseService from "../src/service/PurchaseService";

describe("구입 금액 예외 테스트", () => {
  test.each([0, -1000, -8000])(
    "0이거나 음수인 경우 예외가 발생한다.",
    (amount) => {
      expect(() => PurchaseService.validateAmount(amount)).toThrow(
        ERROR_MESSAGE.INVALID_AMOUNT_POSITIVE
      );
    }
  );

  test.each([1000.7, "abc"])(
    "소수거나 NaN인 경우 예외가 발생한다.",
    (amount) => {
      expect(() => PurchaseService.validateAmount(amount)).toThrow(
        ERROR_MESSAGE.INVALID_AMOUNT_POSITIVE
      );
    }
  );

  test.each([1500, 2786, 4020])(
    "1000원 단위가 아니면 예외가 발생한다.",
    (amount) => {
      expect(() => PurchaseService.validateAmount(amount)).toThrow(
        ERROR_MESSAGE.INVALID_AMOUNT_UNIT
      );
    }
  );

  test.each([1000, 2000, 10000])(
    "정상 금액일 경우 예외가 발생하지 않고 그대로 반환한다.",
    (amount) => {
      expect(PurchaseService.validateAmount(amount)).toBe(amount);
    }
  );
});

describe("구입 금액 1,000원 단위별 계산", () => {
  test.each([
    [1000, 1],
    [5000, 5],
    [24000, 24],
  ])("1,000원당 로또 한 장으로 계산한다.", (amount, count) => {
    expect(PurchaseService.calculateLottoCount(amount)).toBe(count);
  });
});
