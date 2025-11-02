import { ERROR_MESSAGE } from "./errorMessage.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGE.INVALID_LOTTO_LENGTH);
    }
    if (numbers.some((n) => n < 1 || n > 45)) {
      throw new Error(ERROR_MESSAGE.INVALID_RANGE);
    }

    const duplicates = numbers.filter(
      (num, index) => numbers.indexOf(num) != index
    );
    if (duplicates.length > 0) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBER);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
