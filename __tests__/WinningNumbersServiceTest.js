import { ERROR_MESSAGE } from "../src/constants/ErrorMessage";
import WinningNumbersService from "../src/service/WinningNumbersService";

describe("로또 당첨 번호 테스트", () => {
  test("쉼표가 없을 경우 에러가 발생한다", () => {
    expect(() =>
      WinningNumbersService.parseWinningNumbers("1 2 3 4; 5 6")
    ).toThrow(ERROR_MESSAGE.INVALID_SEPARATOR);
  });

  test("숫자가 아닌 문자가 포함되어 있으면 에러가 발생한다.", () => {
    expect(() =>
      WinningNumbersService.parseWinningNumbers("1,2,3,a,b,c")
    ).toThrow(ERROR_MESSAGE.INVALID_NUMBER);
  });

  test("정상 입력 시 숫자 배열을 반환한다.", () => {
    const result = WinningNumbersService.parseWinningNumbers("1,2,3,4,5,6");
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe("보너스 번호 테스트", () => {
  const winningNumbers = [1, 2, 3, 4, 5, 6];
  test("숫자가 아닌 경우 예외가 발생한다.", () => {
    expect(() =>
      WinningNumbersService.parseBonusNumber("a", winningNumbers)
    ).toThrow(ERROR_MESSAGE.INVALID_NUMBER);
  });

  test("1~45 범위의 숫자가 아닌 경우 예외가 발생한다.", () => {
    expect(() =>
      WinningNumbersService.parseBonusNumber("47", winningNumbers)
    ).toThrow(ERROR_MESSAGE.INVALID_RANGE);
  });

  test("로또 번호에 포함된 숫자인 경우 예외가 발생한다.", () => {
    expect(() =>
      WinningNumbersService.parseBonusNumber("3", winningNumbers)
    ).toThrow(ERROR_MESSAGE.BONUS_DUPLICATE_WITH_WINNING);
  });

  test("정상 입력 시 숫자를 반환한다.", () => {
    const bonus = WinningNumbersService.parseBonusNumber("7", winningNumbers);
    expect(bonus).toEqual(7);
  });
});
