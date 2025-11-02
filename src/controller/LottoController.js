import { Console } from "@woowacourse/mission-utils";
import LottoGenerator from "../domain/LottoGenerator.js";
import PurchaseService from "../service/PurchaseService.js";
import ResultService from "../service/ResultService.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/outputView.js";
import WinningNumbersService from "../service/WinningNumbersService.js";

class LottoController {
  async startLotto() {
    const amount = await this.#askAmount();
    const count = PurchaseService.calculateLottoCount(amount);
    const tickets = LottoGenerator.generateMany(count);

    OutputView.printPurchase(count);
    OutputView.printTickets(tickets);

    const winningNumbers = await this.#askWinningNumbers();
    const bonusNumber = await this.#askBonusNumber(winningNumbers);

    const result = tickets.map((t) => t.getNumbers());
    const summary = ResultService.summarizeRanks(
      result,
      winningNumbers,
      bonusNumber
    );
    const totalPrize = ResultService.calculateTotalPrize(summary);
    const rate = ResultService.calculateEarningRate(totalPrize, amount);

    OutputView.printResult(summary);
    OutputView.printEarningRate(rate);
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
}

export default LottoController;
