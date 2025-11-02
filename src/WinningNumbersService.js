import { ERROR_MESSAGE } from "./errorMessage.js";
import Lotto from "./Lotto.js";

class WinningNumbersService {
  static parseWinningNumbers(input) {
    const inputValue = String(input).trim();
    this.#validateHasComma(inputValue);

    const winningNumbers = inputValue.split(",").map((s) => s.trim());
    this.#validateNumbers(winningNumbers);

    const integerNumbers = winningNumbers.map(Number);
    const lotto = new Lotto(integerNumbers);
    return lotto.getNumbers();
  }

  static parseBonusNumber(input, winningNumbers) {
    const inputValue = String(input).trim();
    this.#validateNumber(inputValue);

    const number = Number(inputValue);
    this.#validateRange1to45(number);
    this.#validateNotInWinning(number, winningNumbers);
    return number;
  }

  static #validateHasComma(inputValue) {
    if (!inputValue.includes(",")) {
      throw new Error(ERROR_MESSAGE.INVALID_SEPARATOR);
    }
  }

  static #validateNumbers(numbers) {
    if (numbers.some((s) => s === "" || !/^-?\d+$/.test(s))) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
    }
  }

  static #validateNumber(number) {
    if (number === "" || !/^-?\d+$/.test(number)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
    }
  }

  static #validateRange1to45(number) {
    if (number < 1 || number > 45) {
      throw new Error(ERROR_MESSAGE.INVALID_RANGE);
    }
  }

  static #validateNotInWinning(number, winningNumbers) {
    if (winningNumbers.includes(number)) {
      throw new Error(ERROR_MESSAGE.BONUS_DUPLICATE_WITH_WINNING);
    }
  }
}

export default WinningNumbersService;
