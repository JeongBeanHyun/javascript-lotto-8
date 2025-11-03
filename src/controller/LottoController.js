import { Console } from "@woowacourse/mission-utils";
import LottoGenerator from "../domain/LottoGenerator.js";
import PurchaseService from "../service/PurchaseService.js";
import ResultService from "../service/ResultService.js";
import InputView from "../view/InputView.js";
import WinningNumbersService from "../service/WinningNumbersService.js";
import OutputView from "../view/OutputView.js";

class LottoController {
  async startLotto() {
    const { amount, count, tickets } = await this.#purchaseTickets();
    this.#printTickets(count, tickets);

    const { winningNumbers, bonusNumber } = await this.#askWinningSet();
    this.#calculateAndPrintResult(amount, tickets, winningNumbers, bonusNumber);
  }

  async #askAmount() {
    try {
      const amount = await InputView.inputPurchaseAmount();
      return PurchaseService.validateAmount(amount);
    } catch (error) {
      Console.print(error.message);
      return this.#askAmount();
    }
  }

  async #askWinningNumbers() {
    try {
      const winningNumbers = await InputView.inputWinningNumbers();
      return WinningNumbersService.parseWinningNumbers(winningNumbers);
    } catch (error) {
      Console.print(error.message);
      return this.#askWinningNumbers();
    }
  }

  async #askBonusNumber(winningNumbers) {
    try {
      const bonus = await InputView.inputBonusNumber();
      return WinningNumbersService.parseBonusNumber(bonus, winningNumbers);
    } catch (error) {
      Console.print(error.message);
      return this.#askBonusNumber(winningNumbers);
    }
  }

  async #purchaseTickets() {
    const amount = await this.#askAmount();
    const count = PurchaseService.calculateLottoCount(amount);
    const tickets = LottoGenerator.generateMany(count);
    return { amount, count, tickets };
  }

  #printTickets(count, tickets) {
    OutputView.printPurchase(count);
    OutputView.printTickets(tickets);
  }

  async #askWinningSet() {
    const winningNumbers = await this.#askWinningNumbers();
    const bonusNumber = await this.#askBonusNumber(winningNumbers);
    return { winningNumbers, bonusNumber };
  }

  #calculateAndPrintResult(amount, tickets, winningNumbers, bonusNumber) {
    const result = tickets.map((t) => t.getNumbers());
    const summary = ResultService.summarizeRanks(
      result,
      winningNumbers,
      bonusNumber
    );
    const totalPrize = ResultService.calculateTotalPrize(summary);
    const rate = ResultService.calculateEarningRate(totalPrize, amount);

    this.#printResult(summary, rate);
  }

  #printResult(summary, rate) {
    OutputView.printResult(summary);
    OutputView.printEarningRate(rate);
  }
}

export default LottoController;
